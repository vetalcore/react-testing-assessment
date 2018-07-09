export const fetchRepo = ({ owner, project }) =>
    fetch(`https://api.github.com/repos/${owner}/${project}`)
        .then(response => {
            return response.json();
        });
