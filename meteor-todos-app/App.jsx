// App component - represents the whole app
App = React.createClass({
  /*getTasks() {
    return [
      { _id: 1, text: "This is task 1" },
      { _id: 2, text: "This is task 2" },
      { _id: 3, text: "This is task 3" }
    ];
  },*/

  // Define collection
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    let query = {};

    if (this.state.hideCompleted) {
      // If hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }
    return {
      //tasks: Tasks.find({}).fetch()
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(), //sort newest task to top
      incompleteCount: Tasks.find({checked: {$ne: true}}).count()
    };
  },

  //Define initial state
  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  //Function handle hide complete toggle
  toggleHideCompleted() {
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    });
  },

  //Render task
  renderTasks() {
    /*return this.getTasks().map((task) => {
      return <Task key={task._id} task={task} />;
    });*/
    //Render dynamic collection
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  //Handle form submit
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  //Adding form handling and temporary UI state
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.data.incompleteCount})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
