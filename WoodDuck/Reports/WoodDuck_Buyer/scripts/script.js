var removeDetails = function()
{
    var elArr = document.getElementById('detailsTable').getElementsByTagName('tr');
    for (var i = 0; i < elArr.length; i++)
    {
        elArr[i].style = 'display:none'
    }
};
var goback = function(e)
{
    e = e || window.event;
    if (e.charCode == 82 || e.charCode == 114 || e.charCode == 8)
    {
        location.reload()
    }
    else if (e.charCode == 69 || e.charCode == 101)
    {
        expandAll()
    }
    else if (e.charCode == 67 || e.charCode == 99)
    {
        collapseAll()
    }
};
var expandSummary = function(className)
{
    document.getElementById('detailsTable').getElementsByTagName('tr')[0].style = '';
    var elArr = document.getElementsByClassName(className);
    var j = 1;
    for (var i = 0; i < elArr.length; i++)
    {
        if (elArr[i].getElementsByTagName('td').length == 1)
        {
            if (elArr[i].getElementsByTagName('td')[0].title == "Nested Diagnostic Context")
            {
                elArr[i].style.display = 'table-row';
                j++;
            }
        }
        if (elArr[i].getElementsByTagName('td').length > 1)
        {
            if (elArr[i].getElementsByTagName('td')[2].title != 'Debug Step')
            {
                elArr[i].style = ''
            }
        }
        else
        {
            elArr[i].style = ''
        }
    }
};

function updateCounts(className)
{
    var find = ' ';
    var re = new RegExp(find, 'g');
    strClassName = className.replace(re, ".");
    var stepsPassed = document.querySelectorAll("tr." + strClassName + " > td[title='Nested Diagnostic Context'][bgcolor='#CEF6EC']").length;
    var stepsFailed = document.querySelectorAll("tr." + strClassName + " > td[title='Nested Diagnostic Context'][bgcolor='#FA5858']").length;

    /*
     * var rowCount =
     * document.getElementById('detailsTable').getElementsByTagName('tr').length;
     * var stepsExecuted = rowCount - 1; var stepsPassed = 0; var stepsFailed =
     * 0; for (var i = 1; i < rowCount; i++) { if
     * (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td').length >
     * 2) { if
     * (document.getElementById('detailsTable').getElementsByTagName('tr')[i].className ==
     * className) { if
     * (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].className ==
     * 'failed') { stepsFailed = stepsFailed + 1 } else { stepsPassed =
     * stepsPassed + 1 } } } }
     */
    stepsExecuted = stepsFailed + stepsPassed;
    document.getElementById('footer2').getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent = stepsExecuted;
    document.getElementById('footer2').getElementsByTagName('tr')[1].getElementsByTagName('td')[3].textContent = stepsPassed;
    document.getElementById('footer2').getElementsByTagName('tr')[1].getElementsByTagName('td')[5].textContent = stepsFailed
};

function addRow()
{
    var table = document.getElementById("detailsTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}

function expandAll()
{
    for (i = 0; i < document.getElementsByTagName('input').length; i++)
    {
        document.getElementsByTagName('input')[i].checked = true
    }
    for (var i = 1; i < document.getElementById('detailsTable').getElementsByTagName('tr').length - 1; i++)
    {
        strClassName = document.getElementById('detailsTable').getElementsByTagName('tr')[i].className;
        if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].style.display != 'none')
        {
            if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].title == 'Nested Diagnostic Context')
            {
                i = i + 1;
                while (document.getElementById('detailsTable').getElementsByTagName('tr')[i] != null && document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].title != 'Nested Diagnostic Context' && document.getElementById('detailsTable').getElementsByTagName('tr')[i].className == strClassName)
                {
                    document.getElementById('detailsTable').getElementsByTagName('tr')[i].style.display = '';
                    i = i + 1
                }
                i = i - 1
            }
        }
    }
};

function collapseAll()
{
    for (i = 0; i < document.getElementsByTagName('input').length; i++)
    {
        document.getElementsByTagName('input')[i].checked = false
    }
    for (var i = 1; i < document.getElementById('detailsTable').getElementsByTagName('tr').length - 1; i++)
    {
        if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].style.display != 'none')
        {
            strClassName = document.getElementById('detailsTable').getElementsByTagName('tr')[i].className;
            if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].title == 'Nested Diagnostic Context')
            {
                i = i + 1;
                while (document.getElementById('detailsTable').getElementsByTagName('tr')[i] != null && document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].title != 'Nested Diagnostic Context' && document.getElementById('detailsTable').getElementsByTagName('tr')[i].className == strClassName)
                {
                    document.getElementById('detailsTable').getElementsByTagName('tr')[i].style.display = 'none';
                    i = i + 1
                }
                i = i - 1
            }
        }
    }
};

function updateTestExecutionDetail()
{
    var firstStamp = null;
    var lastStamp = null;
    for (var i = 1; i < document.getElementById('detailsTable').getElementsByTagName('tr').length - 1; i++)
    {
        if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].style.display != 'none')
        {
            strClassName = document.getElementById('detailsTable').getElementsByTagName('tr')[i].className;
            if (document.getElementById('detailsTable').getElementsByTagName('tr')[i + 1].getElementsByTagName('td').length > 2)
            {
                if (firstStamp == null)
                {
                    firstStamp = document.getElementById('detailsTable').getElementsByTagName('tr')[i + 1].getElementsByTagName('td')[3].textContent
                    var find = ' ';
                    var re = new RegExp(find, 'g');
                    strClassName = strClassName.replace(re, ".");
                    var rowCount = document.querySelectorAll("#detailsTable tr." + strClassName).length - 1;
                    lastStamp = document.querySelectorAll("#detailsTable tr." + strClassName)[rowCount].getElementsByTagName('td')[3].textContent;
                    break;
                }
            }
        }
    }
    var d1 = new Date(firstStamp).getTime();
    var d2 = new Date(lastStamp).getTime();
    var duration = (d2 - d1) / 1000;
    document.getElementById('footer2').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].textContent = 'Total Duration  In Seconds : ' + duration + ''
};

function sectionHightlight()
{
    var cSec = null;
    for (var i = 1; i < document.getElementById('detailsTable').getElementsByTagName('tr').length - 1; i++)
    {
        strClassName = document.getElementById('detailsTable').getElementsByTagName('tr')[i].className;
        if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].style.display != 'none')
        {
            if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].title == 'Nested Diagnostic Context')
            {
                cSec = i;
                i = i + 1;
                while (document.getElementById('detailsTable').getElementsByTagName('tr')[i] != null && document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].title != 'Nested Diagnostic Context' && document.getElementById('detailsTable').getElementsByTagName('tr')[i].className == strClassName)
                {
                    if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td').length > 1)
                    {
                        if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].title == 'failed Step')
                        {
                            document.getElementById('detailsTable').getElementsByTagName('tr')[cSec].getElementsByTagName('td')[0].bgColor = '#FA5858'
                            break;
                        }
                        else if (document.getElementById('detailsTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].title == 'Error Occured')
                        {
                            document.getElementById('detailsTable').getElementsByTagName('tr')[cSec].getElementsByTagName('td')[0].bgColor = '#E4DD4E'
                        }
                    }
                    i = i + 1
                }
                i = i - 1
            }
        }
    }
};

function loadDetails(className)
{
    document.getElementById('header').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].textContent = 'Automated Test Execution Results (' + className + ')';
    removeDetails();
    expandSummary(className);
    document.getElementById('main').style.display = 'none';
    document.getElementById('details').style.display = '';
    updateTestExecutionDetail();
    window.addEventListener('keypress', goback, false);
    window.addEventListener('mousedown', expandSection, false);
    sectionHightlight();
    updateCounts(className);
};
var expandSection = function(e)
{
    var el = e.target;
    var currentElement = el;
    var strClassName = el.parentNode.className;
    if (el.title == 'Nested Diagnostic Context')
    {
        if (el.status != 'collapsed')
        {
            currentElement.status = 'collapsed'
        }
        else
        {
            currentElement.status = 'expanded'
        }
        while (el.parentNode.nextElementSibling != null && el.parentNode.nextElementSibling.getElementsByTagName('td')[0].title != 'Nested Diagnostic Context')
        {
            el = el.parentNode.nextElementSibling.getElementsByTagName('td')[0];
            if (el.parentNode.className == strClassName)
            {
                if (currentElement.status == 'collapsed')
                {
                    // if
                    // (currentElement.getElementsByTagName('input')[0].checked)
                    // {
                    el.parentNode.style.display = ''
                    // }
                    // else
                    // {
                    // if
                    // (el.parentNode.getElementsByTagName('td')[0].nextElementSibling
                    // != null)
                    // {
                    // if (el.parentNode.getElementsByTagName('td')[2].title ==
                    // 'Debug Step')
                    // {
                    // el.parentNode.style.display = 'none'
                    // }
                    // else
                    // {
                    // el.parentNode.style.display = ''
                    // }
                    // }
                    // else
                    // {
                    // el.parentNode.style.display = ''
                    // }
                    // }
                }
                else
                {
                    el.parentNode.style.display = 'none'
                }
            }
        }
    }
};
var totalRows = document.getElementById('detailsTable').getElementsByTagName('tr');
var totalTestsUnGrouped = [];
for (var i = 1; i < totalRows.length; i++)
{
    totalTestsUnGrouped[i - 1] = totalRows[i].className
}
var totalTestsGrouped = totalTestsUnGrouped.filter(function(item, index, inputArray)
{
    return inputArray.indexOf(item) == index
});
for (var i = 0; i < totalTestsGrouped.length; i++)
{
    var targetTable = document.getElementById('summaryTable');
    var row = targetTable.insertRow(i + 1);
    row.setAttribute('onclick', "loadDetails('" + totalTestsGrouped[i] + "')");
    var cTestName = row.insertCell(0);
    cTestName.setAttribute('style', 'text-align: left;');
    var cTestDescription = row.insertCell(1);
    cTestDescription.setAttribute('style', 'text-align: left;');
    var cTestStatus = row.insertCell(2);
    var cTestDuration = row.insertCell(3);
    cTestName.innerHTML = "<a title='Click to see details' style='text-decoration:none' onClick=loadDetails('" + totalTestsGrouped[i] + "')>" + totalTestsGrouped[i] + "</a>";
    cTestDescription.innerHTML = 'Under testing';
    cTestStatus.innerHTML = 'Under testing';
    cTestDuration.innerHTML = 'Under testing'
};
getDurationOfTests();
getDescription();
getTestStatus();
updateSummaryCounts();

function updateSummaryCounts()
{
    var totalTests = document.getElementById('summaryTable').getElementsByTagName('tr').length - 1;
    var passedCount = 0;
    var failedCount = 0;
    document.getElementById('header').getElementsByTagName('tr')[2].getElementsByTagName('td')[1].textContent = totalTests;
    for (var i = 1; i < document.getElementById('summaryTable').getElementsByTagName('tr').length; i++)
    {
        if (document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent.indexOf('Failed') < 0)
        {
            failedCount = failedCount + 1
        }
        else
        {
            passedCount = passedCount + 1
        }
    }
    document.getElementById('footer').getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent = failedCount;
    document.getElementById('footer').getElementsByTagName('tr')[1].getElementsByTagName('td')[3].textContent = passedCount
};

function getTestStatus()
{
    for (var i = 1; i < document.getElementById('summaryTable').getElementsByTagName('tr').length; i++)
    {
        if (document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent.indexOf(', 0 Failed') > 0)
        {
            document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent = 'Passed';
            document.getElementById('summaryTable').getElementsByTagName('tr')[i].style.color = 'green';
        }
        else
        {
            document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent = 'Failed';
            document.getElementById('summaryTable').getElementsByTagName('tr')[i].style.color = 'red';
        }
    }
};

function getDescription()
{
    var strClassName = null;
    var stepPassed = 0;
    var stepFailed = 0;
    var stepsExecuted = 0;
    for (var i = 1; i < document.getElementById('summaryTable').getElementsByTagName('tr').length; i++)
    {
        strClassName = document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].textContent;

        var IterationFailed = 0;
        var IterationPassed = 0;
        var IterationCounter = 1;
        var skip = false;
        for (var j = 1; j < document.getElementById('detailsTable').getElementsByTagName('tr').length; j++)
        {

            if (document.getElementById('detailsTable').getElementsByTagName('tr')[j].getElementsByTagName('td').length > 2 && document.getElementById('detailsTable').getElementsByTagName('tr')[j].className == strClassName)
            {
                if (document.getElementById('detailsTable').getElementsByTagName('tr')[j].getElementsByTagName('td')[2].className == 'failed')
                {
                    stepFailed = stepFailed + 1
                }
                else
                {
                    stepPassed = stepPassed + 1
                }
            }
            if (document.getElementById('detailsTable').getElementsByTagName('tr')[j].getElementsByTagName('td').length == 1 && document.getElementById('detailsTable').getElementsByTagName('tr')[j].className == strClassName)
            {
                if (stepFailed > 0)
                {
                    IterationFailed = IterationFailed + 1;
                }
                else
                {
                    IterationPassed = IterationPassed + 1;
                }
                IterationCounter = IterationCounter + 1;
                var stepPassed = 0;
                var stepFailed = 0;
            }
            if (j == document.getElementById('detailsTable').getElementsByTagName('tr').length - 1)
            {
                if (stepFailed > 0)
                {
                    IterationFailed = IterationFailed + 1;
                }
                else
                {
                    IterationPassed = IterationPassed + 1;
                }
                var stepPassed = 0;
                var stepFailed = 0;
            }
        }

        IterationPassed = IterationPassed - 1;
        if (IterationCounter - 1 == 1)
        {
            iNotify = " Iteration";
        }
        else
        {
            iNotify = " Iterations";
        }
        stepsExecuted = stepPassed + stepFailed;
        document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent = '' + IterationCounter - 1 + iNotify + ' Executed, ' + IterationPassed + ' Passed, ' + IterationFailed + ' Failed';
        stepFailed = 0;
        stepPassed = 0;
        stepsExecuted = 0
        IterationPassed = 0;
        IterationFailed = 0;
    }
};

function getDurationOfTests()
{
    var finalSummation = 0;
    var strClassName = null;
    var testDuration = null;
    var firstStamp = null;
    var lastStamp = null;
    var d1 = null;
    var d2 = null;
    var duration = null;
    for (var i = 1; i < document.getElementById('summaryTable').getElementsByTagName('tr').length; i++)
    {
        strClassName = document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].textContent;
        for (var j = 1; j < document.getElementById('detailsTable').getElementsByTagName('tr').length; j++)
        {
            if (document.getElementById('detailsTable').getElementsByTagName('tr')[j].getElementsByTagName('td').length > 2 && document.getElementById('detailsTable').getElementsByTagName('tr')[j].className == strClassName)
            {
                if (firstStamp == null)
                {
                    firstStamp = document.getElementById('detailsTable').getElementsByTagName('tr')[j].getElementsByTagName('td')[3].textContent
                }
                lastStamp = document.getElementById('detailsTable').getElementsByTagName('tr')[j].getElementsByTagName('td')[3].textContent
            }
        }
        d1 = new Date(firstStamp).getTime();
        d2 = new Date(lastStamp).getTime();
        duration = (d2 - d1) / 1000;
        document.getElementById('summaryTable').getElementsByTagName('tr')[i].getElementsByTagName('td')[3].textContent = duration + ' Seconds';
        finalSummation = finalSummation + duration;
        d1 = null;
        d2 = null;
        duration = null;
        firstStamp = null;
        lastStamp = null
    }
    document.getElementById('footer').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].textContent = 'Total Duration In Seconds : ' + finalSummation + ''
};

function presentInfo(element)
{
    if (element.parentNode.parentNode.parentNode.status != 'expanded' && element.checked)
    {
        var el = element.parentNode.parentNode.parentNode;
        var currentElement = element.parentNode.parentNode.parentNode;
        var strClassName = el.parentNode.className;
        currentElement.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "10px";
        while (el.parentNode.nextElementSibling != null && el.parentNode.nextElementSibling.getElementsByTagName('td')[0].title != 'Nested Diagnostic Context')
        {
            el = el.parentNode.nextElementSibling.getElementsByTagName('td')[0];
            if (el.parentNode.className == strClassName)
            {
                if (currentElement.status != 'expanded')
                {
                    if (currentElement.getElementsByTagName('input')[0].checked)
                    {
                        el.parentNode.style.display = '';
                        el.parentNode.style.backgroundColor = '#FFFFFF';
                        if (el.parentNode.getElementsByTagName('td')[2] != null && el.parentNode.getElementsByTagName('td')[2].title == 'Debug Step')
                        {
                            el.parentNode.style.backgroundColor = '#E0F6E5';
                            el.parentNode.style.fontStyle = "italic";
                            el.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "10px";
                        }
                    }
                    else
                    {
                        if (el.parentNode.getElementsByTagName('td')[2].title == 'Debug Step')
                        {
                            el.parentNode.style.display = 'none';
                            el.parentNode.style.backgroundColor = '#FFFFFF';
                        }
                        else
                        {
                            el.parentNode.style.display = '';
                            el.parentNode.style.backgroundColor = '#E0F6E5';
                            el.parentNode.style.fontStyle = "italic";
                            el.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "10px";
                        }
                    }
                }
            }
        }
    }
    else if (element.parentNode.parentNode.parentNode.status != 'expanded' && element.checked == false)
    {
        var el = element.parentNode.parentNode.parentNode;
        var currentElement = element.parentNode.parentNode.parentNode;
        var strClassName = el.parentNode.className;
        currentElement.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "thin";
        while (el.parentNode.nextElementSibling != null && el.parentNode.nextElementSibling.getElementsByTagName('td')[0].title != 'Nested Diagnostic Context')
        {
            el = el.parentNode.nextElementSibling.getElementsByTagName('td')[0];
            if (el.parentNode.className == strClassName)
            {
                if (currentElement.status != 'expanded')
                {
                    if (currentElement.getElementsByTagName('input')[0].checked == true)
                    {
                        el.parentNode.style.display = '';
                        el.parentNode.style.backgroundColor = '#FFFFFF';
                        if (el.parentNode.getElementsByTagName('td')[2] != null && el.parentNode.getElementsByTagName('td')[2].title == 'Debug Step')
                        {
                            el.parentNode.style.backgroundColor = '#E0F6E5';
                            el.parentNode.style.fontStyle = "italic";
                            el.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "10px";
                        }
                    }
                    else
                    {
                        if (el.parentNode.getElementsByTagName('td')[2] != null && el.parentNode.getElementsByTagName('td')[2].title == 'Debug Step')
                        {
                            el.parentNode.style.display = 'none';
                            el.parentNode.style.backgroundColor = '#FFFFFF';
                        }
                        else
                        {
                            el.parentNode.style.display = '';
                            el.parentNode.style.backgroundColor = '#FFFFFF';
                        }
                    }
                }
            }
        }
    }
    else if (element.checked == false)
    {
        var currentElement = element.parentNode.parentNode.parentNode;
        currentElement.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "thin";
    }
    else if (element.checked == true)
    {
        var currentElement = element.parentNode.parentNode.parentNode;
        currentElement.parentNode.getElementsByTagName('td')[0].style.borderLeftWidth = "10px";
    }
};
