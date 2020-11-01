<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/*">
		<html>
			<head>
				<title>Automated Test Execution Report</title>
				<link rel="stylesheet" type="text/css" href="stylesheet/Stylesheet.css" />
			</head>
			<body>
				<table id="Logos">
					<thead>
						<tr class="content">
							<th colspan="2" class="Logos">
								<div style="float:left">
									<img src="screenshots/Cigniti.png" />
								</div>
								<div style="float:right">
									<img src="screenshots/Client.png" />
								</div>
							</th>
							<th colspan="2" class="Logos">
							</th>
						</tr>
					</thead>
				</table>
				<table id="header">
					<tr class="heading">
						<th style="font-size:1.4em;" colspan="4">Automated Test Execution
							Results</th>
					</tr>
					<tr class="subheading" bgcolor="#9acd32">
						<td>Date and Time:</td>
						<td>
							<xsl:value-of select="TestExecutionSummary/DateAndTime" />
						</td>
						<td>Suites Executed:</td>
						<td>
							<xsl:value-of select="TestExecutionSummary/SuiteExecuted" />
						</td>
					</tr>
					<tr class="subheading" bgcolor="#9acd32">
						<td colspan="3">Tests Executed:</td>
						<td>
							<xsl:value-of select="TestExecutionSummary/TestExecuted" />
						</td>
					</tr>
					<tr class="subheading" bgcolor="#9acd32">
						<td colspan='3'>
							Service EndPoint URL(s):
							<xsl:value-of select="TestExecutionSummary/ServiceEndPoint" disable-output-escaping="yes" />
						</td>
						<td style='text-align : center;' colspan='1'>
							<img width='8%' title='Expand All' src='screenshots/expand.png'
								onclick='expandAll()' />
							<img title='Collapse All' width='12%' src='screenshots/collapse.png'
								onclick='collapseAll()' />
							<img title='Refresh' width='8%' src='screenshots/refresh.png'
								onclick='location.reload();' />
						</td>
					</tr>
				</table>
				<div id="main">
					<table id="summaryTable" cellspacing="0" cellpadding="4"
						border="1" bordercolor="#224466" width="100%">
						<tr class="heading">
							<th width='30%'>Test Case</th>
							<th width='40%'>Description</th>
							<th width='15%'>Status</th>
							<th width='15%'>Duration</th>
						</tr>
					</table>
					<table id='footer'>
						<tfoot>
							<tr class='heading'>
								<th colspan='4'>Total Duration In Seconds (Including Report
									Creation) : 179</th>
							</tr>
							<tr class='content'>
								<td class='pass'>Tests Passed:</td>
								<td class='pass'> 2</td>
								<td class='fail'>Tests Failed:</td>
								<td class='fail'> 2</td>
							</tr>
							<tr class='powered'>
								<td
									style='text-align: right; border: 0px solid rgb(77, 124, 123); padding: 0px; background: none repeat scroll 0% 0% rgb(189, 189, 189); font-size: x-small; font-style: italic;'
									colspan='6'> Automated Test Execution Reports, powered by Cigniti</td>
							</tr>
						</tfoot>
					</table>
				</div>

				<div id='details' style='display:none'>

					<table id="detailsTable" cellspacing="0" cellpadding="4"
						border="1" bordercolor="#224466" width="100%" style=''>
						<tr class="heading" style="display:none">
							<th style="width:10%">Step</th>
							<th style="width:80%">Description</th>
							<th style="width:5%">Status</th>
							<th style="width:5%">TimeStamp</th>
						</tr>
						<!--<xsl:for-each select="Testcases/Testcase/Steps/Step"> <tr class="{../../Name}" 
							style="display:none"> <td title="Function Name" style="text-align : left;"><xsl:value-of 
							select="Name"/></td> <td title="Step Description" style="text-align : left"><xsl:value-of 
							select="Description"/></td> <td title="Passed Step" class="{Status}"><font 
							color="green"><img src="screenshots/{Status}.ico" height="20" width="20"/></font></td> 
							<td><span style='visibility:hidden;font-size : 0%;'>01/2/2015</span><span> 
							16:5:27</span></td> </tr> </xsl:for-each> -->
						<xsl:for-each select="Testcases/Testcase/Steps/Step">
							<xsl:choose>
								<xsl:when test="substring-before(Name,'-')='setup'">
									<tr class="{../../Name}" style="display:none">
										<td target="{../../Name}" bgcolor="#CEF6EC" style="text-align : left"
											colspan="6" title="Nested Diagnostic Context" status="{Status}">
											<xsl:value-of select="substring-after(Name,'-')"/>
										</td>
									</tr>
									<tr class="{../../Name}" style="display:none">
										<td title="Function Name" style="text-align : left;">
											<xsl:value-of select="substring-before(Name,'-')" />
										</td>
										<td title="Step Description" style="text-align : left; color : red;">
											<xsl:value-of select="substring-before(Description,'REQUEST:')" disable-output-escaping="yes" />
										</td>
										<td title="{Status} Step" class="{Status}" style="text-align: center;">
											<font color="green">
												<img src="screenshots/{Status}.ico" height="20" width="20" />
											</font>
										</td>
										<td>
											<span style='visibility:hidden;font-size : 0%;'>
												<xsl:value-of select="substring-before(Timestamp,'AND')" />
											</span>
											<span>
												<xsl:value-of select="substring-after(Timestamp,'AND')" />
											</span>
										</td>
									</tr>
								</xsl:when>
								<xsl:otherwise>
									<tr class="{../../Name}" style="display:none">
										<td title="Function Name" style="text-align : left;">
											<xsl:value-of select="substring-before(Name,'-')" />
										</td>
										<td title="Step Description" style="text-align : left">
											<xsl:if test="not(Description='')">
												<span class="{Status}">
													<xsl:value-of select="substring-before(Description,'REQUEST:')" disable-output-escaping="yes" />
												</span>
												<xsl:if test="not(substring-after(Description,'REQUEST:')='')">
													<textarea title="REQUEST" rows="20" style="width: 50%;">
														<xsl:value-of
															select="substring-after(substring-before(Description,'RESPONSE'),'REQUEST:')" />
													</textarea>
													<textarea title="RESPONSE" rows="20" style="width: 50%;">
														<xsl:value-of select="substring-after(Description,'RESPONSE:')" />
													</textarea>
												</xsl:if>
											</xsl:if>
										</td>
										<td title="{Status} Step" class="{Status}" style="text-align: center;">
											<font color="green">
												<img src="screenshots/{Status}.ico" height="20" width="20" />
											</font>
										</td>
										<td>
											<span style='visibility:hidden;font-size : 0%;'>
												<xsl:value-of select="substring-before(Timestamp,'AND')" />
											</span>
											<span>
												<xsl:value-of select="substring-after(Timestamp,'AND')" />
											</span>
										</td>
									</tr>

								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
					</table>

					<table id='footer2'>
						<tfoot>
							<tr class='heading'>
								<th colspan='6'>Total Duration In Seconds (Including Report
									Creation) : 179</th>
							</tr>
							<tr class='content'>
								<td class='executed'>Total Iterations:</td>
								<td class='executed'> 5</td>
								<td class='pass'>Iterations Passed:</td>
								<td class='pass'> 2</td>
								<td class='fail'>Iterations Failed:</td>
								<td class='fail'> 2</td>
							</tr>
						</tfoot>
					</table>
				</div>
				<script type='text/javascript' src='scripts/script.js'></script>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet> 