export const REGEX = {
    PASSWORD: /^(?=.*[A-Za-z])(?=(.*[\d]){1,})(?=.*?[^\w\s]).{8,}$/, //Contains 8 characters atleast 1 number, 1 alphabet, 1 special char
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    ONLY_ALPHABETS: /^([a-zA-Z]+)$/,
    PHONE_NUMBER: /^[6-9]\\d{9}$/,
    NUMBER_GREATER_THAN_0: /^([1-9][0-9]*(\.[0-9]+)?)|(0+[0-9]*[1-9][0-9]*$)/,
    NUMBER_GREATER_THAN_0_OR_EQUAL_TO_ZERO: /^[0-9]*$/,
    ALPHA_NUMERIC: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/,
    ADDRESS: /^[a-zA-Z0-9\s,.'-]{3,}$/,
    NAME: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
    DOB: /[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(\w+\s\w+\s\w+\)/


}
export const PATHS = {
    AUTH: {
        LOGIN: 'login',
        REGISTER: 'register',
        FORGOT_PASSWORD: 'forgot-password',
        RESET_PASSWORD: 'reset-password'
    },
    MAIN: {
        DASHBOARD: 'home',
        PROFILE: 'profile',
        BLOG_WRITE:'write-blog',
        BLOG_DISPLAY:'blog'
    },
    SHARED:{
      NAVBAR: 'navbar',
      RE_DIRECT:'redirect'
    },
    USER_PROFILE: {
      USER_PAGE:'my-page',
      GENERAL_PAGE:'user',
      BLOG_MANAGEMENT:'manage-blog'
    }
  }

  export const PARENT_PATHS = {
    DEFAULT: '',
    AUTH: 'auth',
    MAIN: 'main',
    SHARED:'shared',
    WILDCARD: '**',
    USER_PROFILE:'user-profile'
  }
  export const PATH_MATCH = {
    FULL: 'full',
    PREFIX: 'prefix'
  }

  export const APIS ={
    AUTH :{
      LOGIN:"/api/vi/auth/login",
      GOOGLE_LOGIN:"/api/vi/auth/googleLogin",
      LOGOUT: "/api/vi/auth/logout"
    },
    USER:{
      REGISTER:"/api/v1/user/registration",
      USER_GET: "/api/v1/user/myProfile",
      GUEST_GET: "/api/v1/user?id=",
      ALL_USERS:"/api/v1/user?pageNo=",
      BLOCK_USER: "/api/v1/user/blockUser?id=",
      UNBLOCK_USER: "/api/v1/user/unblockUser"
    },
    PASSWORD :{
      FORGOT_PASSWORD: "/api/v1/password/forgetPassword",
      CHANGE_PASSWORD: "/api/v1/password/changePassword",
      RESET_PASSWORD: "/api/v1/password/resetPassword"
    },
    WRITE_BLOG:{
      BLOG_POST: "/api/blog",
      BLOG_GET: "/api/blog",
      BLOG_GET_BY_ID:"/api/blog/?id=",
      BLOG_GET_BY_USER_ID:"/api/blog/userBlogs?id=",
      BLOG_GET_BY_TAG:"/api/blog/?searchString=",
      BLOG_PUT: "/api/blog?id=",
      BLOG_DELETE: "/api/blog/?id=",
      BLOG_BLOCK_BY_ADMIN:"/api/blog/blockBlog/?id=",
      BLOG_UNBLOCK_BY_ADMIN:"/api/blog/unblockBlog",

      MY_BLOG_GET:"/api/blog/myBlogs",
      FAMOUS_TAGS:"/api/blog/famousTags",
      RECOMMENDATIONS_BLOG:"/api/blog/randomBlogs"
    },
    FILE:{
      FILE_POST:"/api/file/image"
    }
  }
  export const STORAGE_KEYS={
    TOKEN:'token',
    USER_TOKEN:'userId'
  }

