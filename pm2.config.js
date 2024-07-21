module.exports = {
  apps: [
    {
      name: "pnotes",
      script: "npx",
      args: "quartz build --directory=../vault --serve",
      interpreter: "/home/wuzhenquan/.bun/bin/bun", // Path to the Bun interpreter
      cwd: "./quartz", // Set the working directory
    },
  ],
};
