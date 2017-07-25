## Apache Cordova Android 手工打包指令手册
编辑：**tonylinx@qq.com**

###工作平台要求
##### 安装 node.js、cordova、ionic 等前端相关软件与组件 &gt;&gt;&gt;
（配置系统环境变量：计算机 =&gt; 鼠标右键属性 =&gt; 右侧，高级系统设置 =&gt; 高级=&gt; 环境变量）
* 安装 Java-SDK，正确配置系统环境变量 JAVA_HOME、CLASSPATH、加入 PATH：
| 系统环境变量        | 新增字符                                     | 原值   |
| :------------ | :--------------------------------------- | :--- |
| **JAVA_HOME** | **C:\Java\jdk1.8.0_121**                 |      |
| **CLASSPATH** | **.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;%ANT_HOME%\lib;** |      |
| **PATH**      | **%JAVA_HOME%\bin;**                     | Path |
* 安装 Android-SDK，正确配置系统环境变量 ANDROID_HOME、加入 PATH：
| 系统环境变量           | 新增字符                                     | 原值   |
| :--------------- | :--------------------------------------- | :--- |
| **ANDROID_HOME** | **D:\Android\sdk**                       |      |
| **PATH**         | **%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;** | Path |
* 安装 Apache Ant [官网下载 apache-ant-1.10.1-bin.zip (8.4Mb)](http://apache.fayea.com//ant/binaries/apache-ant-1.10.1-bin.zip)
  下载后解压缩至磁盘根目录下（如：D:\apache-ant-1.10.1），配置系统环境变量 ANT_HOME、PATH：
| 系统环境变量       | 新增字符                     | 原值   |
| :----------- | :----------------------- | :--- |
| **ANT_HOME** | **D:\apache-ant-1.10.1** |      |
| **PATH**     | **%ANT_HOME%\bin;**      | Path |
* 安装 Apache Cordova 与 Cordova 创建应用实例：
| 指令                           | 目的                       |
| :--------------------------- | :----------------------- |
| **npm install -g smart-npm** | 用 npm 全局安装 smart-npm     |
| **snpm install -g cordova**  | 用 smart-npm 全局安装 Cordova |
| cordova -v                   | 测试 Cordova 安装完成          |

* 启用 cordova 创建配置项目：
|  No  | 指令                           | 目的                                 |
| :--: | :--------------------------- | :--------------------------------- |
|  1   | cd codes                     | 进入存放代码的文件夹                         |
|  2   | cordova create app           | 创建 cordova 演示项目                    |
|  3   | cd app                       | 进入 Cordova 演示实例主目录                 |
|  4   | npm init                     | 初始化，生成 package.json                |
|  5   | snpm install cordova --save  | 项目本地 Cordova 安装，以便对 cordova 插件进行支持 |
|  6   | cordova platform add android | 添加 android 的平台支持                   |

* **cordova build android --release**
> 执行打包指令。成功后，可在项目**/platforms/android/build/outputs/apk/** 下找到打好的apk包：android-release-unsigned.apk
* **keytool -genkey -v -keystore my-release-key.keystore -alias XXXXXXXX -keyalg RSA -keysize 2048 -validity 10000**
> 签发证书：**Keytool** 是Java-SDK下的一个有效的安全钥匙和证书的管理工具；Android 要求所有程序必须有签名，否则就不安装。输入指令时要将 XXXXXXXX 改成自己设定的名字
* **jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk XXXXXXXX**
> 签名验证：**jarsigner** 是Java-SDK中包含的用于JAR文件签名和验证的工具。注意：输入指令时 XXXXXXXX 与证书名须一致！
*  zipalign -v 4 android-release-unsigned.apk YYYY.apk
> App优化（可选）：**Zipalign** 是android平台上整理APK文件的工具，能够对打包的Android应用程序进行优化。

***
**tony.lin**
2017-07-10
