/*
 * @Author: 归宿
 * @Date: 2023-01-10 16:42:10
 * @Description: 
 */
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
});


// * 假设 form 的 fields 可以获取到。
const form = {
  getAllFields: () => {
    return ['name', 'age', 'gender', 'type']
  }
}

// * 封装的函数
function validatorFn(field: string, customized) {
  const hasRequired = customized.required.includes(field);
  return {
    required: hasRequired,
    validator: function (rule, value, callback) {
      if (!value.length) {
        return callback(new Error(`${field}必须选择`));
      }
      return callback()
    }
  }
}

const customized = {
  required: ['name', 'age', 'gender'],
};
const rules = {}; // * 存取规则
const fields = form.getAllFields();

fields.forEach((item, index) => {
  rules[item] = validatorFn(item, customized);
});


