package com.tyk.mymaterinaldesign.utils;

import android.content.Context;
import android.content.Intent;

import com.tyk.mymaterinaldesign.ImageActivity;


/**
 * Created by Administrator on 2017/3/29 0029.
 */

// js通信接口
public class JavascriptInterface {

    private Context context;


    public JavascriptInterface(Context context) {
        this.context = context;
    }

    @android.webkit.JavascriptInterface
    public void openImage(String img) {
        Intent intent = new Intent();
        intent.putExtra("img", img);
        intent.setClass(context, ImageActivity.class);
        context.startActivity(intent);
        System.out.println(img);
    }
}