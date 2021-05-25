import { quoteString } from "./Sidebar";

test("quoteString() in Sidebar.tsx should enclose strings in quotes, and give quotes proper formatting", ()=>{
  const testString = '"I have a quote ", many commas , , , , and even more quotes """""" "';
  expect(quoteString(testString)).toBe('\"\"\"I have a quote \"\", many commas , , , , and even more quotes \"\"\"\"\"\"\"\"\"\"\"\"\ "\"\"')
})
