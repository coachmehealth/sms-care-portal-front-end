import { formatMessageNewLine } from "./SMSTile";

test("formatMessageNewLine() in  SMSTitle.tsx returns new divisions where there are new lines", () => {
  const testString = `🎯Great job! You recorded your sugar levels for 6️⃣ days this week! 🥳
  You were in the 🟢(80 - 130) 6 of 7️⃣ days!
  
  👉Take 1 minute to remember what you did to keep your sugars in the green, so you can do it again next week.
  
  🟢 Average: 102 mg/dL
  
  🟢Mon: 112
  🟢Tues: 96
  🟢Wed: 92
  🟢Thurs: 103
  🟢Fri: 109
  🟢Sat: 98
  `;

  const expectedValue =
    '[{"type":"div","key":"0","ref":null,"props":{"style":{"display":"flex"},"children":"🎯Great job! You recorded your sugar levels for 6️⃣ days this week! 🥳"},"_owner":null,"_store":{}},{"type":"div","key":"1","ref":null,"props":{"style":{"display":"flex"},"children":"  You were in the 🟢(80 - 130) 6 of 7️⃣ days!"},"_owner":null,"_store":{}},{"type":"div","key":"2","ref":null,"props":{"style":{"display":"flex"},"children":"  "},"_owner":null,"_store":{}},{"type":"div","key":"3","ref":null,"props":{"style":{"display":"flex"},"children":"  👉Take 1 minute to remember what you did to keep your sugars in the green, so you can do it again next week."},"_owner":null,"_store":{}},{"type":"div","key":"4","ref":null,"props":{"style":{"display":"flex"},"children":"  "},"_owner":null,"_store":{}},{"type":"div","key":"5","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢 Average: 102 mg/dL"},"_owner":null,"_store":{}},{"type":"div","key":"6","ref":null,"props":{"style":{"display":"flex"},"children":"  "},"_owner":null,"_store":{}},{"type":"div","key":"7","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢Mon: 112"},"_owner":null,"_store":{}},{"type":"div","key":"8","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢Tues: 96"},"_owner":null,"_store":{}},{"type":"div","key":"9","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢Wed: 92"},"_owner":null,"_store":{}},{"type":"div","key":"10","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢Thurs: 103"},"_owner":null,"_store":{}},{"type":"div","key":"11","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢Fri: 109"},"_owner":null,"_store":{}},{"type":"div","key":"12","ref":null,"props":{"style":{"display":"flex"},"children":"  🟢Sat: 98"},"_owner":null,"_store":{}},{"type":"div","key":"13","ref":null,"props":{"style":{"display":"flex"},"children":"  "},"_owner":null,"_store":{}}]';

  expect(JSON.stringify(formatMessageNewLine(testString))).toBe(expectedValue);
});
