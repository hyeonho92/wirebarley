package com.wireBarley.WireBarley.controller;

import com.wireBarley.WireBarley.model.MainModel;
import com.wireBarley.WireBarley.service.MainService;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    MainService mainService;

    @RequestMapping("/")
    public String main() {

        logger.info("-----------------------------");
        logger.info("-----------------------------");
        logger.info("start");
        logger.info("-----------------------------");
        logger.info("-----------------------------");

        return "index";
    }


    @RequestMapping("/test/ajax")
    @ResponseBody
    public ResponseEntity<?> chnageCurrency(@RequestParam(name = "insertCurrency", required = false) String insertCurrency,
                                            @RequestParam(name = "insertMoney", required = false) Integer insertMoney) throws ParseException {

        MainModel m = mainService.getCurrency(insertCurrency, insertMoney);

        return ResponseEntity.status(HttpStatus.OK).body(m);
    }
}
