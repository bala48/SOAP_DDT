import org.apache.log4j.Logger
/**
* <h1>TestSuiteTearDown</h1>
* This class marks the completion of the execution of the current suite and helps the <br> user, publish the report
* 
* @author  SaiNath.Thada
*/

class TestSuiteTearDown{
	def projectPath
	def context
	def reporter
	public static Logger log = Logger.getLogger(TestSuiteTearDown.class.getName())
	
	/**
	* TestSuiteTearDown Construct
	*/
	TestSuiteTearDown(projectPath,context,reporter){
		this.context = context
		this.projectPath = projectPath	
		this.reporter = reporter
	}	
	
	/**
	* Publishes the report
	*/

	def publishReports(){
		projectPath = projectPath +"//Reports//" + context.getTestSuite().getProject().getName() + "//"
		reporter.setReportFolder(projectPath)
		reporter.PrintContext(context)
	
	}

	def publishTCReports(){
		projectPath = projectPath +"//Reports//" + context.getTestCase().getTestSuite().getProject().getName() + "//"
		reporter.setReportFolder(projectPath)
		reporter.PrintContext(context)
	
	}
	
	
	def writeLog(){
	    //Write script logs to a file - TestSuiteRunListener.afterRun

		def logArea = com.eviware.soapui.SoapUI.logMonitor.getLogArea( "script log" )

		//## Get TestSuite name ##//
		//def TSName = testRunner.testCase.testSuite.name
		def TSName = this.testDataHolder

		//Get LogFile directory and Construct LogFile
		//def FileName = TSName + "-Logs.txt"
		def FileName = TSName + "-Logs" + ((int)(Math.random()*10000)) + ".txt"
		
		def LogFile = new File(context.expand('${#Project#TestReportPath}') + FileName)

		LogFile.write("Generating Script logs....\r\n")

		if(logArea !=null)
		{
			def model = logArea.model
			if(model.size > 0) {
				for(c in 0..(model.size-1))
				{
					LogFile.append(model.getElementAt(c).toString() + "\r\n")
				}
			}
		}
	}
	
}
