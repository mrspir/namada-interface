import React from "react";
import { TopNavigation } from "./TopNavigation";
import { MainSection } from "./MainSection";
import {
  AppContainer,
  MainSectionContainer,
  TopSection,
} from "./styledComponents";
import { ThemeProvider } from "styled-components/macro";
import { darkColors, lightColors, Theme } from "utils/theme";

// this sets the dark/light colors to theme
const getTheme = (isLightMode: boolean): Theme => {
  const colors = isLightMode ? lightColors : darkColors;
  const theme: Theme = {
    themeConfigurations: {
      isLightMode: isLightMode,
    },
    colors: colors,
  };
  return theme;
};

function App(): JSX.Element {
  const [isLightMode, setIsLightMode] = React.useState(true);
  const theme = getTheme(isLightMode);
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <TopSection>
          <TopNavigation
            isLightMode={isLightMode}
            setIsLightMode={setIsLightMode}
          />
        </TopSection>
        <MainSectionContainer>
          <MainSection />
        </MainSectionContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;