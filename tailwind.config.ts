import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {
        primary: colors.green,
        customGreen: '#75A488', // This is your custom green color
      }
    }
  }
}
