module.exports = {
  apps : [{
    script: 'src/index.ts',
    watch: true,
    instances : "max",
    exec_mode : "cluster"
  }],
};
