/*
 * @Author: 卢天宇
 * @Date: 2023-03-17 00:27:20
 * @Description:
 */
const fs = require('fs');

const { join } = require('path');

//准备初始的文件夹的个数及文件个数

let dirConunt = 0;

let fileCount = 0;

//递归打印

const compute = path => {
  try {
    //判断当前文件的存在

    //如果文件夹不存在就直接返回

    if (!fs.existsSync(path)) {
      return;
    }

    //读取当前文件夹的内容

    let files = fs.readdirSync(path); //获取当前文件下的数组

    //然后遍历这个 数组

    files.forEach(file => {
      //判断当前file是否为文件夹

      //得到stats对象

      let stats = fs.statSync(join(path, file));

      //判断单签路径是否是文件夹

      if (stats.isDirectory()) {
        console.log('文件夹有' + join(path, file));

        dirConunt++;

        // 然后递归

        compute(join(path, file));
      } else {
        //是文件

        console.log('文件有' + join(path, file));

        fileCount++;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// console.log(join(__dirname, './dist'));

compute(join(__dirname, './dist/js'));
console.log(fileCount);
