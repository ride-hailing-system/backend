import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import userModel from '../../models/userModel';
import sessionModel from '../../models/sessionModel';

export const getCurrentDateResolver = async (_: any, args: any) => {
  try {
    const currentDate: string = dayjs().format('YYYY-MM-DD');

    return { text: currentDate, value: currentDate };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const currentTimeStamp = () => {
  return dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
};

export const getToken = async (value: string) => {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in environment variables');
  }
  const token = await jwt.sign({ userId: value }, process.env.SESSION_SECRET, {
    expiresIn: '1h',
  });

  return token;
};



export const loginResolver = async (_: any, args: any, context: any) => {
  try {
    const { email, password } = args;
    const { res, req } = context; 

    const user: any = await userModel.findOne({ email }).lean();
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Incorrect password');

    const token = await getToken(user._id);
    const sessionId = uuidv4();

    await sessionModel.create({
      sessionId,
      user: user._id,
      token,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      createdAt: new Date(),
      expiresAt: dayjs().add(1, 'hour').toDate(),
    });

    // Set cookie
    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    return { ...user };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};


export const resetPasswordResolver = async (_: any, args: any) => {
  try {
    const { _id, password } = args;

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await userModel
      .findByIdAndUpdate(
        new Types.ObjectId(_id),
        {
          password: hashedPassword,
        },
        {
          new: true,
        }
      )
      .lean();

    if (!updatedUser) {
      throw new Error('Error occurred while updating the password. Please try again later.');
    }

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changePasswordResolver = async (_: any, args: any) => {
  try {
    const { _id, oldPassword, password } = args;

    const user = await userModel.findById({ _id }).lean();

    if (!user) {
      throw new Error('User not found');
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Incorrect old password');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await userModel
      .findByIdAndUpdate(
        new Types.ObjectId(_id),
        {
          password: hashedPassword,
        },
        {
          new: true,
        }
      )
      .lean();

    if (!updatedUser) {
      throw new Error('Error occurred while updating the password. Please try again later.');
    }

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};


// session
export const getSessionByIdResolver = async (_: any, args: any,context: any) => {
  try {

    const { req } = context; 

    const result = await sessionModel.aggregate([
      {
        $match: {
          sessionId: req.cookies?.session_id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          sessionId: 1,
          token: 1,
          createdAt: 1,
          expiresAt: 1,
          ipAddress: 1,
          userAgent: 1,
          user: '$userInfo',
        },
      },
    ]);

    return result[0] || null;
  } catch (error) {
    console.error('Error fetching session by ID:', error);
    throw new Error('Failed to fetch session by ID');
  }
};

export const logoutResolver = async (_: any, args: any,context: any) => {
  try {

    const { req } = context; 
    const result = await sessionModel.findOneAndDelete({sessionId: req.cookies?.session_id});
    
    return result;

  } catch (error) {
    console.error('Error deleting session by ID:', error);
    throw new Error('Failed to delete session by ID');
  }
};

