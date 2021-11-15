const cameras = [];
let fetched_cameras;

window.addEventListener("load", function () {
  if (
    JSON.parse(window.sessionStorage.getItem("cameras")) !== null &&
    JSON.parse(window.sessionStorage.getItem("cameras")).length !== 0
    ) {
      return;
    }
    fetch("http://localhost:10500/cameras")
      .then((res) => res.json())
      .then((data) => {
        fetched_cameras = data;
        console.log(data);
      });
    var params = {};
    LoginManager.loadAndLogin(params);

  const loginDiv = document.querySelector(".loginDiv");
  loginDiv.style.display = "flex";
  const loaderFlex = document.querySelector(".loaderFlex");

  const username = document.querySelector(".username");
  const password = document.querySelector(".password");
  const connect = document.querySelector(".connect");
  const errorSpan = document.querySelector(".errorSpan");
  let allCamerasNum;
  let currentCamNum = 0;

  connect.onclick = (e) => {
    XPMobileSDKSettings.MobileServerURL = "http://localhost:8081/";
    XPMobileSDK.connect("http://localhost:8081/");
    loaderFlex.style.display = "flex";
    errorSpan.innerText = "";
    setTimeout(() => {
      XPMobileSDK.Login(
        { Username: username.value, Password: password.value },
        () => {
          errorSpan.innerText = "Connected Successfully";
          XPMobileSDK.getAllViews(function (items) {
            errorSpan.innerText = "Fetching Camera Details";

            allCamerasNum = items[0].Items[0].Items[0].Items.length;

            items[0].Items[0].Items[0].Items.forEach((camera, index, array) => {
              console.log(camera);

              let filtered = fetched_cameras.filter(
                (item) => item.IDDevice === camera.Id
              );
              if (filtered.length > 0) {
                camera.fps = filtered[0].value;
              }

              var thumbnailTime = Date.now();
              var params = {
                cameraId: camera.Id,
                time: thumbnailTime,
                width: 800,
                height: 525,
              };
              XPMobileSDK.getThumbnailByTime(
                params,
                //success
                (data) => {
                  currentCamNum++;
                  camera.src = data;
                  cameras.push(camera);
                },
                //fail
                (e) => {
                  currentCamNum++;
                  console.log(e);
                }
              );
              errorSpan.innerText = `Fetching Camera Details: ${currentCamNum}/${allCamerasNum}`;
              if (index === array.length - 1) {
                setTimeout(() => {
                  window.sessionStorage.setItem(
                    "cameras",
                    JSON.stringify(cameras)
                  );
                  loginDiv.style.display = "none";
                }, 500);
              }
            });
          });
        },
        () => {
          loginDiv.style.display = "flex";
          loaderFlex.style.display = "none";
          errorSpan.innerText = "Unable to connect to Milestone";
        }
      );
    }, 500);
  };
});
