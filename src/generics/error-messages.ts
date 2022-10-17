import { ValidationArguments } from "class-validator";

export const ErrorMessages = {
  taille: lengthErrorMessage,
  status: statusMessage
};

function lengthErrorMessage(isMin = true) {
  let taille = 'longue';
  let contrainte = 'maximale';
  if (isMin) {
     taille = 'courte';
     contrainte = 'minimale';
  }
  return (validationData: ValidationArguments): string => {
    return `La taille du champ ${validationData.property} ${validationData.value} est ${taille}, la taille ${contrainte} de ${validationData.property} est ${validationData.constraints[0]}`;
  };
 }

function statusMessage() {
  return (validationData: ValidationArguments) => {
    return `La valeur du statut est erronée `;
  };
}
