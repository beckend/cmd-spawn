/* tslint:disable: no-regex-spaces */
export const sanitizeSpaces = (str: string) => {
  return str
    // Trim any leading space
    .trim()
    // Collapse any multiple spaces into one
    .replace(/  +/g, ' ');
};
