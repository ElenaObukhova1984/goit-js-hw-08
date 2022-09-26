import throttle from "lodash.throttle";
import { save, load, remove } from "./storage";

const LOCAL_STORAGE_KEY = "feedback-form-state";

const formRef = document.querySelector(".feedback-form");
// console.log(formRef);

initPage();

const onFormInput = event => {
    const { name, value } = event.target;
    let saveData = load(LOCAL_STORAGE_KEY);
    saveData = saveData ? saveData : {};
    saveData[name] = value;

    save(LOCAL_STORAGE_KEY, saveData);
};

const throttledFormInput = throttle(onFormInput, 500);
    
formRef.addEventListener('input', throttledFormInput);

function initPage() {
    let saveData = load(LOCAL_STORAGE_KEY);
    if (!saveData)
        return;
    Object.entries(saveData).forEach(([name, value]) => {
        formRef.elements[name].value = value;
    })
};

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const { elements: { email, message } } = event.currentTarget;
    console.log({ email: email.value, message: message.value });
    event.currentTarget.reset();

    remove(LOCAL_STORAGE_KEY);


}

