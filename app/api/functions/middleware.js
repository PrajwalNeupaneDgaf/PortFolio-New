import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_TOKEN;

export async function Authorize(req) {
  try {
    const cookie = req.cookies.get('token'); 


    if (!cookie) {
      throw new Error('No token found');
    }

    const token = cookie.value;
    const payload = jwt.verify(token, JWT_SECRET)


    return { isAuthenticated: true, user: payload };
  } catch (error) {
    return { isAuthenticated: false, error: error.message };
  }
}
