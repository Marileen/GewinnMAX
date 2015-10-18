Compile JS Files

osx
java -classpath optimizer/js.jar:optimizer/compiler.jar org.mozilla.javascript.tools.shell.Main optimizer/r.js -o ./profiles/master.build.js

windows
java -classpath optimizer/js.jar;optimizer/compiler.jar org.mozilla.javascript.tools.shell.Main optimizer/r.js -o ./profiles/master.build.js
java -classpath optimizer/js.jar;optimizer/compiler.jar org.mozilla.javascript.tools.shell.Main optimizer/r.js -o ./profiles/polyfills.IE8.build.js
java -classpath optimizer/js.jar;optimizer/compiler.jar org.mozilla.javascript.tools.shell.Main optimizer/r.js -o ./profiles/polyfills.IE9.build.js


------------------------------------------------------------------------------------------------------------------------


Compile CSS Files

java -classpath optimizer/js.jar org.mozilla.javascript.tools.shell.Main optimizer/less-rhino-1.5.1.js ../less/style.less > ../_release/css/style.css