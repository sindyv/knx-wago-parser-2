const header = () => {
	const date = new Date()
	const timestamp = date.toISOString().split("Z")[0]
	return `<?xml version="1.0" encoding="utf-8"?>
<project xmlns="http://www.plcopen.org/xml/tc6_0200">
  <fileHeader companyName="" productName="CODESYS" productVersion="CODESYS V3.5 SP19 Patch 7" creationDateTime="${timestamp}" />
  <contentHeader name="Export.project" modificationDateTime="${timestamp}">
    <coordinateInfo>
      <fbd>
        <scaling x="1" y="1" />
      </fbd>
      <ld>
        <scaling x="1" y="1" />
      </ld>
      <sfc>
        <scaling x="1" y="1" />
      </sfc>
    </coordinateInfo>
    <addData>
      <data name="http://www.3s-software.com/plcopenxml/projectinformation" handleUnknown="implementation">
        <ProjectInformation />
      </data>
    </addData>
  </contentHeader>
  <types>
    <dataTypes />
    <pous>`
}

const pouHeader = (puoName) => {
	return `
        <pou name="${puoName}" pouType="program">
        <interface>`
}

const pouLocalVars = (retain = null) => {
	return `
              <localVars ${
								retain !== null
									? `retain="${retain}" persistent="${retain}"`
									: ""
							} >`
}

const pouEndLocalVars = () => {
	return `
              </localVars>`
}

const pouOutputVars = (retain = null) => {
	return `
              <outputVars ${
								retain !== null
									? `retain="${retain}" persistent="${retain}"`
									: ""
							} >`
}

const pouEndOutputVars = () => {
	return `
              </outputVars>`
}

const pouActions = () => {
	return `
              <actions>`
}

const pouEndActions = () => {
	return `
              </actions>`
}

const pouVariable = (name, type, comment = null) => {
	return `
                        <variable name="${name}" > 
                          <type>
                            <derived name="${type}" /> 
                          </type>
                          ${
														comment !== null
															? `<documentation>
                            <xhtml xmlns="http://www.w3.org/1999/xhtml">${comment}</xhtml>
                          </documentation>`
															: ""
													}
                        </variable>   
    `
}

const pouAction = (name, data, id) => {
	return `
                    <action name="${name}" > 
                        <body>
                        <ST>
                            <xhtml xmlns="http://www.w3.org/1999/xhtml">
                                ${data}
                            </xhtml>
                        </ST>
                        </body>    
                        <addData>
                            <data name="http://www.3s-software.com/plcopenxml/objectid" handleUnknown="discard">
                                <ObjectId>${id}</ObjectId>
                            </data>
                        </addData>                                               
                    </action>   
    `
}

const pouEndInterface = () => {
	return `
            </interface>`
}

const pouMiddle = () => {
	return `
            <body>
              <ST>
                <xhtml xmlns="http://www.w3.org/1999/xhtml">
    `
}

const pouEnd = (id) => {
	return `
                </xhtml>
              </ST>
            </body>
            <addData>
                <data name="http://www.3s-software.com/plcopenxml/objectid" handleUnknown="discard">
                    <ObjectId>${id}</ObjectId>
                </data>
            </addData>
          </pou>
    `
}

const gvlHeader = (name) => {
	return `
        <data name="http://www.3s-software.com/plcopenxml/globalvars" handleUnknown="implementation">
          <globalVars name="${name}" >
    `
}

const gvlVar = (name, type, comment) => {
	return `
      <variable name="${name}">
      <type>
        <derived name="${type}" />
      </type>
      ${
				comment === undefined
					? ""
					: `
        <documentation>
          <xhtml xmlns="http://www.w3.org/1999/xhtml">${comment}</xhtml>
        </documentation>
        `
			}
    </variable>
  `
}

const gvlFooter = () => {
	return `
    </globalVars>
</data>
    `
}

const middle = () => {
	return `
        </pous>
      </types>
      <instances>
        <configurations />
      </instances>
      <addData>`
}

const footer = (folderStructure = null) => {
	function generateXmlFromFolderStructure(folderStructure) {
		let xmlOutput = ""

		function buildXml(folders) {
			folders.forEach((folder) => {
				// Open the Folder tag with the folderName
				xmlOutput += `  <Folder Name="${folder.folderName}">\n`

				// Add Objects for each item in the pous array
				folder.pous.forEach((pou) => {
					xmlOutput += `    <Object Name="${pou.pouName}" ObjectId="${pou.id}" />\n`
				})

				// If the folder has children, recursively call the function
				if (folder.children && folder.children.length > 0) {
					buildXml(folder.children)
				}

				// Close the Folder tag
				xmlOutput += `  </Folder>\n`
			})
		}

		// Start building the XML from the folder structure
		buildXml(folderStructure)

		return xmlOutput
	}

	const output = generateXmlFromFolderStructure(folderStructure)

	return `
        <data name="http://www.3s-software.com/plcopenxml/projectstructure" handleUnknown="discard">
            <ProjectStructure>
                ${output}
            </ProjectStructure>
        </data>
      </addData>
    </project>
    `
}

module.exports = {
	header,
	middle,
	footer,
	pouHeader,
	pouLocalVars,
	pouEndLocalVars,
	pouOutputVars,
	pouEndOutputVars,
	pouVariable,
	pouActions,
	pouEndActions,
	pouAction,
	pouEndInterface,
	pouMiddle,
	pouEnd,
	gvlHeader,
	gvlFooter,
	gvlVar,
}
