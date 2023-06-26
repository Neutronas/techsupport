"use client";
import { Accordion } from "flowbite-react";
import NavigationItemForm, { NavigationItem } from "./NavigationItemForm";

interface NavigationFormProps {
  navigation: NavigationItem[];
}

// TODO: Need state management (REDUX?) to make it easier update the state of components
export default function NavigationForm({ navigation }: NavigationFormProps) {
  return (
    <Accordion collapseAll>
      {navigation &&
        navigation.map((navigationItem) => (
          <Accordion.Panel key={navigationItem.id} isOpen={false}>
            <Accordion.Title>{navigationItem.title}</Accordion.Title>
            <Accordion.Content>
              <NavigationItemForm navigationItem={navigationItem} />
            </Accordion.Content>
          </Accordion.Panel>
        ))}
    </Accordion>
  );
}
