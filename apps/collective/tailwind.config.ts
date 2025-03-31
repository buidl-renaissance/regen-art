import { withAccountKitUi } from "@account-kit/react/dist/types/tailwind";
 
export default withAccountKitUi(
  {
    // 1. (required) your existing tailwind config
    // If you are using tailwind v4, this will likely be empty.
    // If you're still using tailwind v3, this will contain things like content, theme, plugins, etc. - https://v3.tailwindcss.com/docs/installation/using-postcss
  },
  {
    // 2. (optional) overwrite AccountKit theme options
  }
);