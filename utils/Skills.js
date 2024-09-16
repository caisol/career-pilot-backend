// const skillsDB = require('./skillsDB')
class Skills {

    static extractSkills = (description, skillsDB) => {
        // console.log(skillsDB)
    //    let skillsDB = {
    //         'WEB DEVELOPMENT': ['ASP', 'ASP.NET', 'ATG DYNAMO', 'B2B', 'B2C', 'CAFE`', 'CGI', 'COLD FUSION', 'DHTML', 'DIVINE PARTICIPANT SERVER', 'EJB', 'EXPLPRER', 'EXTRANET', 'GRAPHICS', 'HTML', 'INTERWOVEN', 'INTRANET', 'J2EE', 'J2SE', 'JAVA', 'JAVASCRIPT', 'JAVA SWING', 'JBOSS', 'JBUILDER', 'JDBC', 'JDK', 'JSP', 'JTABLES', 'JTEST', 'JUNIT', 'N-TIER', 'NAVIGATOR', 'NETSCAPE', 'OBJECT STORE', 'PHP', 'RESIN', 'VB.NET', 'VB SCRIPT', 'VIGNETTE', 'VISUAL INTERDEV', 'VISUAL STUDIO.NET', 'WSAD', 'XML', 'XSL', 'XSLT'],
    //         LANGUAGES: ['4GL', 'ABAP', 'ADA', 'ACP/TPF', 'APL', 'ASSEMBLER-IBM', 'ASSEMBLER-MICRO', 'C', 'C#', 'C\\+\\+', 'CICS COMMANDO', 'CICS MACRO', 'COBOL', 'DELPHI', 'DYL', 'EASYTRIEVE', 'EASYTRIEVE PLUS', 'ESQL', 'FOCUS', 'FORTE', 'FORTRAN', 'INFO-BASIC', 'JAKARTA', 'JAVA', 'JCL', 'LISP', 'NATURAL', 'OCL', 'PASCAL', 'PL/1', 'PLC', 'POWERBUILDER', 'POWERHOUSE', 'PROLOG', 'REXX', 'RPG', 'SAS', 'SMALLTALK', 'SPSS', 'TELON', 'T-SQL', 'UDMS', 'UML', 'VBA', 'VISUAL BASIC', 'VISUAL C\\+\\+'],
    //         DATABASES: ['ADABAS', 'SQL', 'ADS/ON-LINE', 'CULPRIT', 'DATACOM', 'DB2', 'DBMS', 'DL/1', 'DMS', 'FOCUS DATABASE', 'IBM SQL/DS', 'IDMS', 'IMS/DB', 'IMS/DC', 'INFORMIX', 'INGRES', 'MODEL 204', 'MS ACCESS', 'MS SQL SERVER', 'MYSQL', 'PACBASE','PROGRESS', 'RDB', 'STORED PROCEDURES', 'SYBASE', 'TERADATA', 'TOTAL', 'UDB', 'UDMS' ],
    //         NETWORK: ['CCNA', 'CCNP', 'CCPA', 'ROUTING', 'CISCO', 'WAN', 'WLAN']
    //     }
        let candSkills = {
            'WEB DEVELOPMENT': [],
            DATABASES: [],
            LANGUAGES: [],
            NETWORK:[]
        }
        description = description.toUpperCase();
        // console.log(description)
        skillsDB.map(({ category, skillsArr }) => {
            skillsArr.forEach(skill => {
                if(skill.includes('C++')) skill = skill.replace('C++', 'C\\+\\+')

                // if(skill = 'SQL') console.log('SQL')
                let regExp = new RegExp(`\\b${skill}(JS|.JS)?\\b`, 'g');
                //if statement to deal with C
                if(skill==='C'){
                    regExp = /\bC(?![#+])\b/g
                }
                // if statement to deal with c# and c++
                if(skill.endsWith('C\\+\\+') || skill.endsWith('C#')){
                    regExp = new RegExp(`${skill}` , 'g');
                }
                if(description.search(regExp) > -1){
                    skill = skill.replace(/\\+/g, '')
                    candSkills[category].push({
                        skill,
                        count: description.match(regExp).length,
                    });
                }
            })
        })
    
        return candSkills
    }

     static extractSkillsArray = (description, skillsDB) => {
        let candSkillsArr = []
        description = description.toUpperCase();
        skillsDB.map(({ category, skillsArr }) => {
            skillsArr.forEach(skill => {
                if(skill.includes('C++')) skill = skill.replace('C++', 'C\\+\\+')

                // if(skill = 'SQL') console.log('SQL')
                let regExp = new RegExp(`\\b${skill}(JS|.JS)?\\b`, 'g');
                //if statement to deal with C
                if(skill==='C'){
                    regExp = /\bC(?![#+])\b/g
                }
                // if statement to deal with c# and c++
                if(skill.endsWith('C\\+\\+') || skill.endsWith('C#')){
                    regExp = new RegExp(`${skill}` , 'g');
                }
                if(description.search(regExp) > -1){
                    skill = skill.replace(/\\+/g, '')
                    if(!candSkillsArr.includes(skill))
                        candSkillsArr.push(skill)
                }
            })
        })
        return candSkillsArr;
    }

    static matchSkills = (skillsArg, reqArgs, skillsDB) => {
       
        let matchedSkills = {
            'WEB DEVELOPMENT': [],
            DATABASES: [],
            LANGUAGES: [],
        }
        skillsArg = skillsArg.toUpperCase();
        reqArgs = reqArgs.toUpperCase();
        skillsDB.map(({ category, skillsArr }) => {
            skillsArr.forEach(skill => {
                if(skill.includes('C++')) skill = skill.replace('C++', 'C\\+\\+')

                // if(skill = 'SQL') console.log('SQL')
                let regExp = new RegExp(`\\b${skill}(JS|.JS)?\\b`, 'g');
                //if statement to deal with C
                if(skill==='C'){
                    regExp = /\bC(?![#+])\b/g
                }
                // if statement to deal with c# and c++
                if(skill.endsWith('C\\+\\+') || skill.endsWith('C#')){
                    regExp = new RegExp(`${skill}` , 'g');
                }
                if(skillsArg.search(regExp) > -1 && reqArgs.search(regExp) > -1){
                    skill = skill.replace(/\\+/g, '')
                    matchedSkills[category].push({skill, count: (reqArgs).match(regExp).length})
                }
            })
        })
    
        return matchedSkills
    }

    static matchSkillsArr = (skillsArg, reqArgs, skillsDB) => {
       
        let matchSkillsArr = []
        skillsArg = skillsArg.toUpperCase();
        reqArgs = reqArgs.toUpperCase();
        skillsDB.map(({ category, skillsArr }) => {
            skillsArr.forEach(skill => {
                if(skill.includes('C++')) skill = skill.replace('C++', 'C\\+\\+')

                // if(skill = 'SQL') console.log('SQL')
                let regExp = new RegExp(`\\b${skill}(JS|.JS)?\\b`, 'g');
                //if statement to deal with C
                if(skill==='C'){
                    regExp = /\bC(?![#+])\b/g
                }
                // if statement to deal with c# and c++
                if(skill.endsWith('C\\+\\+') || skill.endsWith('C#')){
                    regExp = new RegExp(`${skill}` , 'g');
                }
                if(skillsArg.search(regExp) > -1 && reqArgs.search(regExp) > -1){
                    skill = skill.replace(/\\+/g, '')
                    if(!matchSkillsArr.includes(skill))
                        matchSkillsArr.push(skill)
                }
            })
        })
    
        return matchSkillsArr
    }
    
}



module.exports = Skills;