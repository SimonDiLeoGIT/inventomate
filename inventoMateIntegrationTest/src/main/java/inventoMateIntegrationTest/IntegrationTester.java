package inventoMateIntegrationTest;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class IntegrationTester {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:5173/");	
		// Encuentra el botón con el texto "Sign Up"
        WebElement signUpButton = driver.findElement(By.xpath("//button[contains(text(), 'Sign Up')]"));

        // Haz clic en el botón
        signUpButton.click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
     // Encuentra y completa el campo de correo electrónico
        WebElement emailInput = driver.findElement(By.xpath("//label[contains(text(), 'Email address*')]/following-sibling::input"));
        emailInput.sendKeys("userTest01@example.com");

        // Encuentra y completa el campo de contraseña
        WebElement passwordInput = driver.findElement(By.xpath("//label[contains(text(), 'Password*')]/following-sibling::input"));

        // Ingresa la contraseña en el campo de entrada
        passwordInput.sendKeys("(123Abc)");

        // Encuentra el botón "Continue" y haz clic en él
        WebElement continueButton = driver.findElement(By.xpath("//button[contains(text(), 'Continue')]"));
        continueButton.click();
        
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        WebElement acceptButton = driver.findElement(By.xpath("//button[contains(text(), 'Accept')]"));
        acceptButton.click();
        
 
	}	

}
