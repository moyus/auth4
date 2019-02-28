# Auth4
四要素信息生成及校验工具

## 安装
```bash
$ npm install -g auth4
```

## 使用
生成15条四要素信息
```bash
$ auth4 -q 15
```

校验身份证号
```bash
$ auth4 -i 33000019992287527
```

校验银行卡号
```bash
$ auth4 -c 6226663287907969862
```

校验手机号
```bash
$ auth4 -p 15102899865
```

## License
MIT