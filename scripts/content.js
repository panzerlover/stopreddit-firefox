browser.storage.sync.get({limit: 100}).then((data) => {
    const scrollLimit = (data.limit || 69) + 2;
    let generate = true;
    let modal;

    window.addEventListener("scroll", function () {
      const postSelector = `.thing[data-rank="${scrollLimit}"]`;
      const shreddySelector = `shreddit-post[feedindex="${scrollLimit}"]`
      const targetPost = document.querySelector(postSelector);
      const targetShreddy  = document.querySelector(shreddySelector);

      stopAtPost(targetPost);
      stopAtPost(targetShreddy);
    });

    function stopAtPost(targetPost) {
      if (targetPost) {
        const distanceToBottom =
            targetPost.getBoundingClientRect().bottom - window.innerHeight;

        const thresholdDistance = targetPost.offsetHeight;
        if (distanceToBottom <= thresholdDistance) {
          if (generate) {
            modal = displayModal();
            generate = false;
          } else {
            Object.assign(modal.style, redoStyle);
          }
        } else {
          if (!generate) {
            Object.assign(modal.style, undoStyle);
          }
        }
    }
    }

    function displayModal() {

          const modal = document.createElement("div");
          Object.assign(modal.style, fullscreenOverlayStyle);

          const overlayContent = document.createElement("div");
          Object.assign(overlayContent.style, overlayContentStyle);
          overlayContent.textContent = "You have better things to do";

          modal.appendChild(overlayContent);
          document.body.appendChild(modal);
          return modal;
    }

    const undoStyle = {
      zIndex: -5,
      visibility: "hidden"
    }

    const redoStyle = {
      zIndex: 9999,
      visibility: "visible"
    }

    const fullscreenOverlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)', // Adjust the alpha value for transparency
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    
    const overlayContentStyle = {
      color: 'white',
      fontSize: '56px',
    };
});
