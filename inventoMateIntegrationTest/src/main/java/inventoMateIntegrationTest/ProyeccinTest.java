package inventoMateIntegrationTest;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
public class ProyeccinTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
 
  public void setUp(WebDriver driver) {
	    this.driver = driver;
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }

  public void tearDown() {
    driver.quit();
  }

  public void proyeccin() {
    //driver.get("http://localhost:5173/");
	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    WebElement link = wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("Company")));
    link.click();
    
    link = wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("Sales Forecasting")));
    link.click();
    
    //WebElement selector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".-bg--color-border-very-lightst-grey:nth-child(1)")));
    //selector.click();
    
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".-bg--color-border-very-lightest-grey:nth-child(1)"));
      dropdown.findElement(By.xpath("//option[. = 'Sucursalísima']")).click();
    }
    link = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".-bg--color-semidark-violet")));
    link.click();
    
    link = wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("28")));
    link.click();
    
    js.executeScript("window.scrollTo(0,136)");
    
    link = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".-shadow--color-light-opaque-pink")));
    link.click();
   
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".-shadow--color-light-opaque-pink"));
      dropdown.findElement(By.xpath("//option[. = 'iPhone 13']")).click();
    }
    
    link = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("section > .hover\\\\3A cursor-pointer > .w-full")));
    link.click();
  }
}
