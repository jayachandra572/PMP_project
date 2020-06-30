const envVariables = process.env

let config = {}
Object.keys(envVariables).forEach(variable => {
   if (variable.includes('REACT_APP_')) {
      const envKey = variable.replace('REACT_APP_', '')
      config[envKey] = envVariables[variable]
   }
})

export default config
