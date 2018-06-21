window.addEventListener("load", getRepositories);

function getRepositories() {
  let repoList = document.getElementById("repoList");
  let output = "";
  // get all repos
  fetch("https://api.github.com/users/aduda091/repos?sort=pushed")
    .then(res => res.json())
    .then(repos => {
      for (let repo of repos) {
        // prepare a div element to output found data
        let repoDomItem = document.createElement("div");
        repoDomItem.className = "repo";

        // begin generating output (Firefox workaround)
        let itemHtml = `
          <h4 class="repoName"><a href="${repo.html_url}"> ${repo.name}</a></h4>
          <div>
            <p class="repoDescription"> ${
              repo.description ? repo.description : ""
            }  </p>
            `;

        // find URL of the current repo languages
        let langUrl = repo.languages_url;
        // get current repo languages
        fetch(langUrl)
          .then(langs => langs.json())
          .then(languages => {
            // create an array of languages
            let langArr = Array.from(Object.keys(languages));
            // join them with a comma
            let langString = langArr.join(", ");
            // output languages to the DOM node
            itemHtml += `
                <p class="repoLanguages">(${langString})</p>
              </div>
            `;
            // finally, update the DOM with complete output of the repo data
            repoDomItem.innerHTML = itemHtml;
            repoList.appendChild(repoDomItem);
          });
      }
    })
    .catch(error => {
      // hide visual evidence of any errors
      repoList.remove();
      document.getElementById("repoListTitle").remove();
      console.log(error);
    });
}
