const getSnippetsFor = (language) =>
  `cat src/snippets.json | jq -c 'map(select(.types | contains(\"${language}\")))' > snippets/${language}.json`;

module.exports = {
  scripts: {
    build: {
      default: 'nps snippets readme',
    },
    readme: {
      top: 'cat src/README_top.md > README.md',
      table:
        "cat src/snippets.json | grep 'prefix\\|description' | sed -e \"s/description//\" | sed -e \"s/prefix//\" | sed -e 's/    \"\": \"//' | sed -e 's/\",//' | sed -e 'N;s/\\n/ | /' | sed -e 's/$/ |/g' | sed -e 's/^/| /' | sort  >> README.md",
      bottom: 'cat src/README_bottom.md >> README.md',
      default: 'nps readme.top readme.table readme.bottom.md',
    },
    snippets: {
      typescript: `${getSnippetsFor('typescript')}`,
      default: 'nps snippets.typescript',
    },
    publish: {
      default: 'npm version patch; vsce publish',
    },
  },
};
