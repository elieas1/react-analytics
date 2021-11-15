const Start = (props) => {
  return (
    <div className="loginDiv2">
      <div className="login">
        <div class="loginTitle">
          <span className="loginTitleName">IVA</span>
          <span className="loginTitleDesc">Analytics Configuration</span>
        </div>
        <div className="loginBody2">
          <div>
            <button
              className="startButton"
              id="startNew"
              onClick={() => {
                props.showCams(true);
                props.setStart(false);
              }}
            >
              Start New
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                fetch("http://localhost:10500/configs")
                  .then((res) => res.json())
                  .then((data) => {
                    let copy = props.changes;
                    for (const [key] of Object.entries(data)) {
                      if (copy.hasOwnProperty(key)) {
                        copy[key] = data[key];
                      }
                    }
                    props.setChanges({ ...copy });
                    props.showCams(true);
                    props.setStart(false);
                    alert('Previous configurations loaded succesfully')
                  }).catch(e=>{
                    alert('No available previous configurations')
                  })
              }}
              className="startButton"
              id="loadConfig"
            >
              Load Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
