Edit soapui.bat that exist in location <Install location>\bin and update the following
	
	1. Update JAVA path, after change it will be something like 
		ex: set JAVA=C:\Program Files\Java\jre1.8.0_171\bin\java
		
	2. Add %SOAPUI_HOME%\ext\*; to CLASSPATH, after change it will be something like
		ex: set CLASSPATH=%SOAPUI_HOME%soapui-5.4.0.jar;%SOAPUI_HOME%\ext\*;%SOAPUI_HOME%..\lib\*
