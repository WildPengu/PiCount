import styles from "./PersonalData.module.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../Theme";
import { useTranslation } from "react-i18next";
import "../../../i18next";
import Button from "../../button/Button";
import { Color } from "../../../types/Enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export const PersonalData = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const handleAccordionButton = () => {
    console.log("click");
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <div className={`${styles.PersonalDataContainer} ${theme}Container`}>
      <div className={styles.HeaderContainer}>
        <h2>{t("settingsComponent.personalData")}</h2>
        <Button
          backgroundColor={Color.transparent}
          onClick={() => handleAccordionButton()}
        >
          <FontAwesomeIcon icon={isAccordionOpen ? faAngleUp : faAngleDown} />
        </Button>
      </div>
      <div
        className={styles.AccordionContainer}
        style={{ display: isAccordionOpen ? "none" : "block" }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit neque
          ipsum iure facere, perferendis ut quae accusamus unde culpa amet
          possimus nam sint saepe dolore iste expedita? Provident, quo
          molestiae.
        </p>
      </div>
    </div>
  );
};
