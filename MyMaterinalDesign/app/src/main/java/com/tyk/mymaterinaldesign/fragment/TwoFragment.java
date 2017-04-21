package com.tyk.mymaterinaldesign.fragment;

import android.util.Log;
import android.view.View;

import com.tyk.mymaterinaldesign.R;

import org.xutils.x;

/**
 * Created by Administrator on 2017/3/24 0024.
 */

public class TwoFragment extends BaseFragment {


    @Override
    public View initView() {
        View view=View.inflate(activity, R.layout.fragment_two,null);
        x.view().inject(this,view);
        Log.e("Fragment","two");

//        textPost();
        return view;
    }

//    private void textPost() {
//
//
//        String path="/mnt/sdcard/Download/icon.jpg";
//        RequestParams params = new RequestParams("");
//        params.setMultipart(true);
//        params.addBodyParameter("file",new File(path));
//        Callback.Cancelable post = x.http().post(params, new Callback.CommonCallback<String>() {
//            @Override
//            public void onSuccess(String result) {
//            }
//
//            @Override
//            public void onError(Throwable ex, boolean isOnCallback) {
//            }
//
//            @Override
//            public void onCancelled(CancelledException cex) {
//            }
//
//            @Override
//            public void onFinished() {
//            }
//        });
//
//        //取消请求
//        post.cancel();
//    }


//    @Override
//    public void onStart() {
//        super.onStart();
//        Log.e("Fragment","two--onStart");
//    }
//
//    @Override
//    public void onResume() {
//        super.onResume();
//        Log.e("Fragment","two--onResume");
//    }

}
