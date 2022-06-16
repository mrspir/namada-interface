import { useEffect, useState } from "react";
import { Button } from "components/ButtonTemporary";
import {
  AccountInformationViewContainer,
  AccountInformationViewUpperPartContainer,
  AccountInformationForm,
  DescriptionAndInputContainer,
  Header1,
  Header5,
  BodyText,
  Input,
  InputContainer,
  ButtonContainer,
} from "./SeedPhraseConfirmation.components";

type SeedPhraseConfirmationProps = {
  seedPhrase: string[];
  onCtaHover: () => void;
  onConfirmSeedPhrase: () => void;
};

function SeedPhraseConfirmation(
  props: SeedPhraseConfirmationProps
): JSX.Element {
  const { seedPhrase, onCtaHover, onConfirmSeedPhrase } = props;
  const seedPhraseLength = seedPhrase.length;
  const [verificationInput, setVerificationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [indexToConfirm, setIndexToConfirm] = useState(-1);

  useEffect(() => {
    setIndexToConfirm(Math.floor(Math.random() * seedPhraseLength));
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      // Call after the time it takes to animate the button into a disabled state
      setTimeout(() => {
        onConfirmSeedPhrase();
      }, 300);
    }
  }, [isSubmitting]);

  return (
    <AccountInformationViewContainer>
      {/* header */}
      <AccountInformationViewUpperPartContainer>
        <Header1>Verify Phrase</Header1>
      </AccountInformationViewUpperPartContainer>

      {/* form */}
      <AccountInformationForm>
        <DescriptionAndInputContainer>
          {/* description */}
          <BodyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim augue
            aenean facilisi placerat laoreet sem faucibus{" "}
          </BodyText>

          {/* seed verification */}
          <InputContainer>
            <Header5>Word #{indexToConfirm + 1}</Header5>
            <Input
              onChange={(event) => {
                setVerificationInput(event.target.value);
              }}
            />
          </InputContainer>
        </DescriptionAndInputContainer>
        {/* submit */}
        {isSubmitting && <p>Creating master account...</p>}
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsSubmitting(true);
            }}
            disabled={
              verificationInput !== seedPhrase[indexToConfirm] || isSubmitting
            }
            onHover={onCtaHover}
          >
            Verify
          </Button>
        </ButtonContainer>
      </AccountInformationForm>
    </AccountInformationViewContainer>
  );
}

export default SeedPhraseConfirmation;