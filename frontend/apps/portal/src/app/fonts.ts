import localFont from "next/font/local";

const iransans = localFont({
  src: [
    {
      path: "../../public/assets/fonts/iransans/woff2/IRANSansWeb(FaNum)_UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/iransans/woff2/IRANSansWeb(FaNum)_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/iransans/woff2/IRANSansWeb(FaNum).woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/iransans/woff2/IRANSansWeb(FaNum)_Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/iransans/woff2/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
});

/*const roboto = localFont({
  src: [
    {
      path: "../../public/assets/fonts/roboto/woff2/Roboto-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/roboto/woff2/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/roboto/woff2/Roboto-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/roboto/woff2/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});*/

export { iransans, /*roboto*/ };
