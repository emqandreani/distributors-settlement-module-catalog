/* eslint-disable import/no-anonymous-default-export */
//only permits the standalone mode in development
if (process.env.NODE_ENV !== "production") {
  import("./bootstrap");
}

export default true;
