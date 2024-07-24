import Generator from 'yeoman-generator';
import yosay from 'yosay';
import * as glob from 'glob'
import fs from 'fs'
import path from 'path';

//function for change the .net version of all layears
const changeFreamWorkVersion  = (version, filePath, self) => {
  const targetFreamworkPath = self.destinationPath(filePath);
  let fileContent = self.fs.read(targetFreamworkPath);
  

  const targetFreamWorkRegex = /<TargetFramework>.*?<\/TargetFramework>/;
  const newTargetFreamWorkRegex = `<TargetFramework>${version}<\/TargetFramework>`;
  fileContent = fileContent.replace(targetFreamWorkRegex, newTargetFreamWorkRegex);

  self.fs.write(targetFreamworkPath, fileContent);
};


const MyGenerator = class extends Generator {


  
    // Prompting user for inputs
 async prompting() {
  //   const componentName = await this.prompt([
  //     {
  //     type: 'input',
  //     name: 'foldername',
  //     message: 'Your project name',
  //     default: this.appname // Default to current folder name
  //   },
  // ]).then((answer) => {
  //   this.answer = answer;
  //   this.log('project name : ', this.answer.foldername);
  // });


  // this.projectName = await this.prompt(
  //   [
  //     {
  //       type: 'input',
  //       name: 'appname',
  //       message: 'Enter project name : ',
  //       default: 'SampleProject'
  //     }
  //   ]).then((ans) => {
  //     this.answer = ans;
  //     this.log('project : ', this.answer.appname);
  //   });


  // this.dataBase = await this.prompt(
  //   {
  //     type:'list',
  //     name:'database',
  //     message:'Select DataBase support :',
  //     default:'SQL server',
  //     choices: [
  //       {
  //         name: 'mongoDB',
  //         value:'mongodb'
  //       },
  //       {
  //         name:'SQL server',
  //         value:'sql_server'
  //       },
  //       {
  //         name:'MySql',
  //         value:'mysql'
  //       }
  //     ]
  //   }
  // ).then((answer) => {
  //   this.answer = answer;
  //   this.log('DataBase : ', this.answer.database);
  // });

  const dotNet = await this.prompt([
        {
          type: 'input',
          name: 'appname',
          message: 'Enter project name : ',
          default: 'SampleProject'
        },
        {
          type:'list',
          name:'database',
          message:'Select DataBase support :',
          default:'SQL server',
          choices: [
            {
              name: 'mongoDB',
              value:'mongodb'
            },
            {
              name:'SQL server',
              value:'sql_server'
            },
            {
              name:'MySql',
              value:'mysql'
            }
          ]
        },
        {
          type:'list',
          name:'dotnetversion',
          message:'Select required .Net version :',
          default:'net8.0',
          choices: [
            {
              name: 'Dot-Net 8.0',
              value:'net8.0'
            },
            {
              name:'Dot-Net 6.0',
              value:'net6.0'
            }
          ]
        }
      ]).then((answer) =>{
        this.answer = answer;
        this.log('app name version : ', this.answer.appname);
        this.log('database version : ', this.answer.database);
        this.log('dotNet version : ', this.answer.dotnetversion);
      });
  }

 

  // Writing logic here
  async writing() {


    const tempaletData = {
      appName : this.answer.appname,
    };



const renameFileAndFolders = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if(stats.isDirectory()) 
  })
}









     // Create a new directory with the name provided by the user
  const newDirPath = this.destinationPath(tempaletData.appName);
  //this.fs.ensureDirSync(newDirPath);


  const oldName = 'sampleWeb';
    

    // glob.sync(this.destinationPath('**'), { dot: true }).forEach(file => {
    //   const newFile = file.replace(new RegExp(oldName, 'gi'), tempaletData.appName);
    //   if (file !== newFile) {
    //     this.fs.move(file, newFile);
    //   }
    // });
    

    
    this.fs.copyTpl(
      this.templatePath('SampleWeb'),
      this.destinationPath(`${tempaletData.appName}`),
      tempaletData
    );

    this.fs.copyTpl(
      this.templatePath('SampleWeb/SampleWeb/'),
      this.destinationPath(`${tempaletData.appName}/${tempaletData.appName}/`),
      tempaletData
    );

    this.fs.copyTpl(
      this.templatePath('SampleWeb/SampleWeb.Domain/'),
      this.destinationPath(`${tempaletData.appName}/${tempaletData.appName}.Domain/`),
      tempaletData
    );
    

    // const templates = [
    //   'SampleWeb',
    //   // 'src',
    //   // `${this.componentName}.js`,
    //   // 'index.html',
    //   // ... other template files
    // ];

    // templates.forEach((item) => {
    //   this.fs.copyTpl(
    //     this.templatePath(item),
    //     this.destinationPath(item),
    //     { title: 'Templating with Yeoman' }
    //   );
    // });

    




    // const self = this;
    // changeFreamWorkVersion(this.answer.dotnetversion,'SampleWeb/SampleWeb/SampleWeb.API.csproj', self);
    // changeFreamWorkVersion(this.answer.dotnetversion, 'SampleWeb/SampleWeb.Application/SampleWeb.Application.csproj', self);
    // changeFreamWorkVersion(this.answer.dotnetversion, 'SampleWeb/SampleWeb.Domain/SampleWeb.Domain.csproj', self);
    // changeFreamWorkVersion(this.answer.dotnetversion, 'SampleWeb/SampleWeb.Infarstructure/SampleWeb.Infarstructure.csproj', self);

    // this.log('version : ',this.answer.dotnetversion);
    // this.log('databse : ',this.answer.database);

    this.log('app name version : ', this.answer.appname);
    this.log('database version : ', this.answer.database);
    this.log('dotNet version : ', this.answer.dotnetversion);

    


//     this.fs.copyTpl(
//       this.templatePath('Component.html'),
//       this.destinationPath(`${this.componentName}.html`)
//       ,{ componentName : this.componentName }
//     );
// //==============================================
// this.fs.copyTpl(
//   this.templatePath('DotNetCLI/sampleProjectAPI/sampleProjectAPI.csproj'),
//   this.destinationPath(`DotNetCLI/${this.name}.API.csproj`)
//   ,{ name : this.name }
// );

//     this.fs.copyTpl(
//       this.templatePath('DotNetCLI/sampleProjectApplication/sampleProjectApplication.csproj'),
//       this.destinationPath(`DotNetCLI/${this.name}.Application.csproj`)
//       ,{ name : this.name }
//     );

//     this.fs.copyTpl(
//       this.templatePath('DotNetCLI/sampleProjectDomain/sampleProjectDomain.csproj'),
//       this.destinationPath(`DotNetCLI/${this.name}.Domain.csproj`)
//       ,{ name : this.name }
//     );

//     this.fs.copyTpl(
//       this.templatePath('DotNetCLI/sampleProjectInfastructure/sampleProjectInfastructure.csproj'),
//       this.destinationPath(`DotNetCLI/${this.name}.Infastructure.csproj`)
//       ,{ name : this.name }
//     );

    



    //---------------------------------------
    // this.fs.copyTpl(
    //   this.templatePath('SampleWeb/'),
    //   this.destinationPath(`${this.name}/src/${this.componentName}.jsx`)
    //   ,{ componentName : this.componentName }
    // );
    


    
  }



   install() {
  //   // Perform installation steps (e.g., npm install)
  //   //this.spawnCommandSync('dotnet', ['restore'], { cwd: this.destinationPath() });
  // Perform installation steps (e.g., npm install)
  //this.spawnCommandSync('dotnet', ['build'], { cwd: this.destinationPath() });
   }
  end() {
    // this.spawnCommandSync('dotnet', ['build'], { cwd: this.destinationPath() });
    this.log(yosay('All done !'));
  }
}








export default MyGenerator;