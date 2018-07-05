package first.sample.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import first.common.common.CommandMap;
import first.sample.service.SampleService;

@Controller
public class SampleController {
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="sampleService")
	private SampleService sampleService;
	
	@RequestMapping(value="/sample/openSampleBoardList.do")
    public ModelAndView openSampleBoardList(Map<String,Object> commandMap) throws Exception{
    	ModelAndView mv = new ModelAndView("/sample/boardList");
    	
    	List<Map<String,Object>> list = sampleService.selectBoardList(commandMap);
    	mv.addObject("list", list);
    	
    	return mv;
    }
	
	@RequestMapping(value="/chart.do")
    public ModelAndView openChart(Map<String,Object> commandMap) throws Exception{
    	ModelAndView mv = new ModelAndView("/sample/chart");
    	
    	return mv;
    }
	@RequestMapping(value="/chart/drawchart.do")
	public ModelAndView selectBoardList(CommandMap commandMap) throws Exception{
	    ModelAndView mv = new ModelAndView("jsonView");
	    
	    if(commandMap.isEmpty() == false){
	        Iterator<Entry<String,Object>> iterator = commandMap.getMap().entrySet().iterator();
	        Entry<String,Object> entry = null;
	        while(iterator.hasNext()){
	            entry = iterator.next();
	            log.debug("key : "+entry.getKey()+", value : "+entry.getValue());
	        }
	    }
	    
	    List<Map<String,Object>> list = sampleService.selectChart(commandMap.getMap());
	    mv.addObject("list", list);
	    if(list.size() > 0){
	        mv.addObject("TOTAL", list.get(0).get("TOTAL_COUNT"));
	    }
	    else{
	        mv.addObject("TOTAL", 0);
	    }
	     
	    return mv;
	}
	
	@RequestMapping(value="/sample/testMapArgumentResolver.do")
	public ModelAndView testMapArgumentResolver(CommandMap commandMap) throws Exception{
	    ModelAndView mv = new ModelAndView("");
	     
	    if(commandMap.isEmpty() == false){
	        Iterator<Entry<String,Object>> iterator = commandMap.getMap().entrySet().iterator();
	        Entry<String,Object> entry = null;
	        while(iterator.hasNext()){
	            entry = iterator.next();
	            log.debug("key : "+entry.getKey()+", value : "+entry.getValue());
	        }
	    }
	    return mv;
	}
}
