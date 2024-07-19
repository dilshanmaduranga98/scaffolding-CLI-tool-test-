import Generator from 'yeoman-generator';
import yosay from 'yosay';

const MyGenerator = class extends Generator {
    // Prompting user for inputs
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'confirm',
      name: 'cool',
      message: 'Would you like to enable the Cool feature?'
    }]).then((answers) => {
      this.log('app name', answers.name);
      this.log('cool feature', answers.cool);
    });
  }

  // Writing logic here
  writing() {
    const templates = [
      'DotNetCLI',
      'src',
      'index.html',
      // ... other template files
    ];

    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        { title: 'Templating with Yeoman' }
      );
    });
  }

  // Install dependencies
  // install() {
  //   this.npmInstall(['lodash'], { 'save-dev': true });
  // }
  end() {
    this.log(yosay('All done !'));
  }
}

export default MyGenerator;