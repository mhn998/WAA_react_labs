import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
// import qs from "query-string";

const cookie = new Cookies();

export const loginService = async ({ email, password }) => {
  try {
    const result = await axios.post("http://localhost:8080/auth/login", {
      email: email.toLowerCase(),
      password,
    });
    if (result.data.accessToken) {
      const cookie = new Cookies();
      const timer = moment().add(60, "minutes");

      cookie.set(
        "at-auth",
        { ...result.data, timer },
        {
          maxAge: 3600,
          path: "/",
          //   domain: config.domain,
          secure: true,
        }
      );
    }
    return true;
  } catch {
    return false;
  }
};

export const refreshTokenApi = async (refreshToken, token, setUser) => {
  try {
    const { data } = await axios.put(
      'http://localhost:8080/auth/token/refresh',
      {
        refreshToken,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const timer = moment().add(60, 'minutes');
    cookie.set(
      'at-auth',
      { ...data, timer },
      {
        maxAge: 3600,
        // domain: config.domain,
        secure: true,
      },
    );
  } catch (e) {
    setUser({ loggedIn: false });
    cookie.remove('at-auth', {
      // domain: config.domain,
      secure: true,
    });
    window.location.href = '/';
  }
};
