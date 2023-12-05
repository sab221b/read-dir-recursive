const fs = require('fs');
const path = require('path');
const directory = './node_modules';
let converter = require('json-2-csv');

const readFolder = async (dir, allFiles = []) => {
  const files = fs.readdirSync(dir);
  allFiles.push(...files.map((item) => {
    const filePath = path.join(dir, item);
    return {
      name: item,
      'FILE PATH': filePath,
      'TYPE': fs.statSync(filePath).isDirectory() ? 'folder' : 'file'
    }
  }
  ))
  files.forEach(f => {
    const filePath = path.join(dir, f);
    fs.statSync(filePath).isDirectory() && readFolder(filePath, allFiles)
  })
  return allFiles.map((item, index) => {
    return {
      sNO: index + 1,
      ...item,
    }
  });
}

module.exports = {
  async list(req, res) {
    const readFilePromise = new Promise(async (resolve) => {
      const result = readFolder(directory);
      resolve(result);
    })
    readFilePromise
      .then(async (result) => {
        try {
          const csvData = await converter.json2csv(result);
          fs.writeFileSync('output.csv', csvData);
          res.status(200).send({ result });
        } catch (error) {
          res.status(503).send(error);
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

};
