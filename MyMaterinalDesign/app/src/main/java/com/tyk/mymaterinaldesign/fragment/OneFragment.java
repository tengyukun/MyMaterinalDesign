package com.tyk.mymaterinaldesign.fragment;

import android.content.Intent;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.tyk.mymaterinaldesign.R;
import com.tyk.mymaterinaldesign.adapter.MainAdapter;
import com.tyk.mymaterinaldesign.WebViewActivity;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

/**
 * Created by Administrator on 2017/3/24 0024.
 */

public class OneFragment extends BaseFragment {


    @ViewInject(R.id.rv_fragmentone_content)
    private RecyclerView rv_fragmentone_content;

    @Override
    public View initView() {

        View view=View.inflate(activity, R.layout.fragment_one,null);
        x.view().inject(this,view);
        Log.e("Fragment","one");
        initRecylerView();
        return view;
    }

    private void initRecylerView() {

        rv_fragmentone_content.setLayoutManager(new LinearLayoutManager(activity));
        MainAdapter adapter=new MainAdapter(activity);
        rv_fragmentone_content.setAdapter(adapter);
        rv_fragmentone_content.setItemAnimator(new DefaultItemAnimator());


        adapter.setOnItemClickListener(new MainAdapter.OnRecyclerViewItemClickListener() {
            @Override
            public void onItemClick(View view, String data) {

                Intent intent=new Intent(activity,WebViewActivity.class);
                startActivity(intent);

            }
        });


    }
}
