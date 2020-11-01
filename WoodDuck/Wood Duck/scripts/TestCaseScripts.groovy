import com.cigniti.soap.ui.core.DataMapper
import com.eviware.soapui.SoapUI
import com.eviware.soapui.impl.wsdl.testcase.WsdlTestRunContext
import org.apache.log4j.Logger
import java.io.File

/**
* <h1>Driver</h1>
* This class drives the execution of the data driven steps <br/> by helping the user with the required set up and teardown methods
* 
* @author  SaiNath.Thada
*/

class Driver {

	def context
	def testSuite
	def testDataHolder
	def testCaseName
	def logHandler
	def testRunner
	
	public static Logger log = Logger.getLogger(Driver.class.getName())
	
	/**
	* Driver Construct
	*/
	Driver(context){
		this.context = context
		this.testSuite = context.testCase.testSuite
		this.testDataHolder = testSuite.project.getPropertyValue(testSuite.name)
		this.testCaseName = context.testCase.name		
	}
	
	/**
	* Sets the execution
	*/
	def execute(){

		if(context.getTestCase().getPropertyValue("loopCounter")=="") {
			context.getTestCase().setPropertyValue("loopCounter","1")
		}

		def loopCounter = context.getTestCase().getPropertyValue("loopCounter")


		if(context.getTestCase().getPropertyValue("dataHolder")=="") {
			def dm =  new DataMapper(testDataHolder).filter(testCaseName)
			dm.setCurrentRow(context.getTestCase().getPropertyValue("loopCounter").toInteger())
			dm.toProperties(context)
			context.testCase.setPropertyValue("iterationDescription" + loopCounter, dm.value("TestScenario_DetailedDescription"))
			context.getTestCase().setPropertyValue("dataHolder",dm.preserveState())
		}
		else {
			def dm = new DataMapper(context.testCase.getPropertyValue("dataHolder"))
			dm.setCurrentRow(context.getTestCase().getPropertyValue("loopCounter").toInteger())
			dm.toProperties(context)
			context.testCase.setPropertyValue("iterationDescription" + loopCounter, dm.value("TestScenario_DetailedDescription"))
		}
		
		
	}
	
	

		
	
	/**
	* Teardown and loop
	*/
	def loop(){
		def dm = new DataMapper(context.testCase.getPropertyValue("dataHolder"))
		def loopCounter = context.getTestCase().getPropertyValue("loopCounter").toInteger()
		def loopCount = dm.rowCount()
		if (loopCounter < loopCount) {
			loopCounter = loopCounter + 1
			context.getTestCase().setPropertyValue("loopCounter",loopCounter.toString())
			context.testRunner.gotoStep(0)
		}
		else {
			context.getTestCase().setPropertyValue("loopCounter","1")
			context.getTestCase().setPropertyValue("dataHolder","")
		}
	}
	
	/**
	* Inserts additional information in the executed steps
	* 
	* @param stepName
	*  - expects the step name executed previously
	* @param message
	*  - expects the log statements that needs to be printed in the report
	*/
	def report(stepName,message){
		def tResults = context.testRunner.getResults()
		if(context.stepCount == null){
			context.stepCount = 0
		}
		int i = 0
		for(tResult in tResults){
				if(tResult.testStep.name.equals(stepName) && i > context.stepCount){
					context.stepCount = i
					tResult.addMessages(message)
				}
			i++
		}
	}
}
