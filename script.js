window.addEventListener("load", getRepositories);

function getRepositories() {
  let repoList = document.getElementById("repoList");
  let output = "";
  //if (self.fetch) {
  fetch("https://api.github.com/users/aduda091/repos?sort=pushed")
    .then(res => res.json())
    .then(repos => {
      for (let repo of repos) {
        let langUrl = repo.languages_url;
        fetch(langUrl)
          .then(langs => langs.json())
          .then(languages => {
            let langArr = Array.from(Object.keys(languages));
            let langString = langArr.join(", ");
            let item = `
					<div class="repo">	
							<h4 class="repoName"><a href="${repo.html_url}"> ${repo.name}</a></h4>
						<div>
							<p class="repoDescription"> ${repo.description ? repo.description : ""}  </p>
							<p class="repoLanguages">(${langString})</p>
						</div>
				</div>
			`;
            output += item;
          })
          .catch(error => {
            alert(error);
          })
          .finally(() => {
            //finally is not supported by some browsers
            repoList.innerHTML = output;
          });
      }
    })
    .catch(error => {
      repoList.innerHTML =
        "<p>Unable to fetch repositories at this moment, please use the GitHub link above.</p>";
      console.log(error);
    });
}
