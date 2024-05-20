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

public class FuncionalidaddePedirInformedeNuevasTendenciasTest {
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
  
  public void funcionalidaddePedirInformedeNuevasTendencias() {
    
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    WebElement companyLink = wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("Company")));
    companyLink.click();
    {
      WebElement element = driver.findElement(By.linkText("Company"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    WebElement newTrends = wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("New Trends")));
    newTrends.click();
    {
      WebElement element = driver.findElement(By.linkText("New Trends"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    driver.findElement(By.cssSelector(".-bg--color-border-very-lightest-grey:nth-child(1)")).click();
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".-bg--color-border-very-lightest-grey:nth-child(1)"));
      dropdown.findElement(By.xpath("//option[. = 'Sucursalísima']")).click();
    }
    driver.findElement(By.cssSelector(".-bg--color-semidark-violet")).click();
    //driver.findElement(By.linkText("22")).click();
    //driver.findElement(By.cssSelector(".p-2:nth-child(2) .-bg--color-form-background-semi-white:nth-child(1) .m-auto")).click();
    //driver.findElement(By.cssSelector(".right-4 > img")).click();
  }
}
