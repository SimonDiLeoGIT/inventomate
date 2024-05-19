package com.inventoMate.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.inventoMate.dtos.meli.BestSellerDTO;
import com.inventoMate.dtos.meli.CategoryDTO;
import com.inventoMate.dtos.meli.ProductAdditionalInfoDTO;
import com.inventoMate.dtos.meli.ResultProductDTO;
import com.inventoMate.dtos.meli.TrendKeyWordDTO;

@FeignClient(name = "meliClient", url = "${meli.url.base}")
public interface MeliClient {

    @GetMapping("${meli.url.predict-category}")
    List<CategoryDTO> predictCategory(@RequestParam("limit") int limit, @RequestParam("q") String productName,
                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String token);

    @GetMapping("${meli.url.highlight-top}/{categoryId}")
    BestSellerDTO highlightsTop20(@PathVariable("categoryId") String categoryId,
                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String token);

    @GetMapping("${meli.url.product}")
    ResultProductDTO getProductById(@RequestParam("product_identifier") String idProduct,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String token);

    @GetMapping("${meli.url.trends}/{categoryId}")
    List<TrendKeyWordDTO> getTrends(@PathVariable("categoryId") String categoryId,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String token);

    @GetMapping("${meli.url.product-additional-info}/{idProduct}")
    ProductAdditionalInfoDTO getProductAdditionalInfo(@PathVariable("idProduct") String idProduct,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String token);

}


